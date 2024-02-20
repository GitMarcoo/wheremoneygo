import { ref, watch, watchEffect } from 'vue'
import useFetch from '@/utils/useFetch'

/**
 * Provides utility methods for performing asynchronous CRUD operations via RESTful API using Vue.js Composition API
 * and Fetch.
 */
export default class RESTAdaptorWithFetch<E> {
  resourcesUrl: string
  copyConstructor: (input: any) => E 

  constructor (resourcesUrl: string, copyConstructor: (input: any) => E) {
    this.resourcesUrl = resourcesUrl
    this.copyConstructor = copyConstructor
  }

  /**
     * function to get all the entities from the backend
     * @returns {entities, isPending, error, load} you need to make a const and destructure the return value
     * 
     */
  findAll () {
    const entities = ref<E[]>([])
    const { data, isPending, error, load } =  useFetch(this.resourcesUrl, {}, 'GET')

    watchEffect(() => {
      entities.value = data.value.map((entity: any) => this.copyConstructor(entity))
    })

    return { entities, isPending, error, load }
  }

  /**
     * finds entity per id
     * @param {Number} id  the id of the entity you want to get
     * @returns {entity, isPending, error, load, id} you need to make a const and destructure the return value
     */
  findById (id: number) {
    const entity = ref<E>()
    const entityId = ref<number>(id)

    const { data, isPending, error, load } = useFetch(this.resourcesUrl + '/' + id, {}, 'GET')

    const updateAndLoad = (newId: number) => {
      entityId.value = newId
      load(this.resourcesUrl + '/' + newId)
    }
    watchEffect(() => {
      if (data.value === null || data.value.length === 0) return
      entity.value = this.copyConstructor(data.value)
    })

    watch(entityId, (newId) => {
      updateAndLoad(newId)
    })

    return { entity, isPending, error, load, entityId }
  }

  /**
   * Saves an entity or updates it if it already exists.
   * @returns  {entity, isPending, error, load, abort, isAborted} you need to make a const and destructure the return value
   * @param entityToSave the entity you want to save
   * @param quizId the quizId if you want to save a question
   * @param method the method you want to use, default is POST
   */
// #todo fix any type
  save (entityToSave: any, method = 'POST') {
    const entity = ref(entityToSave)
    let endpoint: string = this.resourcesUrl

    if(entity.value.id > 0) {
      method = 'PUT'
      endpoint = this.resourcesUrl + '/' + entity.value.id
    }

    const { data, isPending, error, load, abort, isAborted } = useFetch(endpoint, entity.value, method)

    watchEffect(() => {
      if (isPending.value === false && error.value === null) {
        entity.value = this.copyConstructor(data.value)
      }
    })

    return { entity, isPending, error, load, abort, isAborted }
  }

  /**
     * Deletes an entity from the backend.
     * @param {Number} id the id of the entity you want to delete
     * @returns {isPending, error, load} you need to make a const and destructure the return value
     */

  deleteById (id: number) {
    const entityId = ref(id)

    const { isPending, error, load, abort, isAborted } = useFetch(this.resourcesUrl + '/' + entityId.value, {}, 'DELETE')

    return { isPending, error, load, abort, isAborted }
  }

  custom (endpoint: string, method: string, body: any, params: any) {
    const entity = ref<E[] | E | any>([])
    endpoint = this.resourcesUrl + '/' + endpoint

    const { data, isPending, error, load, abort, isAborted } = useFetch(endpoint, body, method, params)

    watchEffect(() => {
      if (data.value === null || data.value.length === 0) return
      if (data.value as any[]) {
        entity.value = data.value.map((entity: any) => this.copyConstructor(entity))
      } else if (data.value as any){
        entity.value = this.copyConstructor(data.value)
      }
    })

    return { entity, isPending, error, load, abort, isAborted }
  }
}
