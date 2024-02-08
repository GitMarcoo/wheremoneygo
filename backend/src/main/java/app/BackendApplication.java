package app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Value("${frontend.url}")
	private String frontendUrl;
	@Bean
	public WebMvcConfigurer corsConfigurer(){
		return new WebMvcConfigurer() {
			//plz work now
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				System.out.println(frontendUrl);
				registry.addMapping("/**").allowedOrigins(frontendUrl)
						.allowedMethods("GET", "POST", "PUT", "DELETE");
//						.allowedHeaders(HttpHeaders.AUTHORIZATION,
//								HttpHeaders.CONTENT_TYPE)
//						.exposedHeaders(HttpHeaders.AUTHORIZATION,
//								HttpHeaders.CONTENT_TYPE)
//						.allowCredentials(true);
			}
		};
	}

}
