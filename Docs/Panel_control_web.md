# Panel de control web 
En este apartado se pretende que se logre hacer el despliegue de del sitio la configuración y las posibles configuraciones necesarias. 

## Contenido 

1. [Configuración del entorno](./Config_environment.md)

1. [Configuración del ESP32](./Panel_control_web.md#configuración-del-esp32)
    - [ADC](./Panel_control_web.md#adc-en-esp32)
    - [Subprocesos](https://github.com/UNIT-Electronics/DualMCU_ESP32_Micropython_threads/blob/main/Docs/introduccion.md)

1. [Configuración del servidor](./Panel_control_web.md#configurando-el-host)
1. [Configuración del cliente](./Panel_control_web.md#configuración-del-cliente)

## Configuración del ESP32
La configuración para el uso de la DualMCU con el microcontrolador ESP32, considera ciertas particularidades para el desarrollo del proyecto. 
### ADC en ESP32
El ESP32 de la DualMCU, según el [manual directo de MicroPython](https://docs.micropython.org/en/latest/esp32/quickref.html),  y la [documentacion oficial](https://docs.espressif.com/projects/esp-idf/en/release-v4.2/esp32/api-reference/peripherals/adc.html) especifican que el ADC admite dos controladores ADC principales: ADC1, que proporciona 8 canales conectados a los pines GPIO 32 al 39, y ADC2, que ofrece 10 canales conectados a los pines GPIO 0, 2, 4, y de 12 a 15, así como del 25 al 27.

Sin embargo, es importante tener en cuenta que el uso de ADC2 viene con algunas restricciones significativas en ciertas aplicaciones debido a que el controlador Wi-Fi también utiliza ADC2. Considerar que solo se puede utilizar ADC2 cuando el controlador Wi-Fi no se ha iniciado.

Además, algunos de los pines asociados con ADC2 se utilizan como pines de sujeción y no pueden utilizarse libremente.

### Configurando el host 
Es de suma importancia haber [configurado tu entorno](./Config_environment.md). De acuerdo a lo anterior, la configuración se debe mantener para ejecutar nuestro ejemplo.

Descarga o clona el repositorio. Encontrarás el archivo de ejemplo en el directorio [Control_web_panel](../Control_web_panel/). Como se mencionó en la configuración del entorno, debes ejecutar el archivo app.js de la siguiente manera:

```
node app.js
```

El código te mostrará un mensaje breve como el siguiente:
```
Servidor en funcionamiento en 0.0.0.0:3000
```
Esto significa que el servicio está activo, y la dirección a la que debes dirigirte para visualizar el proyecto es:

http://localhost:3000/


![Image](../img/web_localhost.png)

### Configuración del cliente

La ESP32 debe contar con el firmware de MicroPython. Si no estás familiarizado con el proceso, te invitamos a explorar el repositorio  [DualMCU ESP32: MicroPython](https://github.com/UNIT-Electronics/DualMCU-ESP32-MicroPython).

En el directorio de [esp32micropython](../Control_web_panel/esp32micropython/esp32_comunication_between_server_client.py) 
encontrarás un archivo:
> [esp32_comunication_between_server_client.py](../Control_web_panel/esp32micropython/esp32_comunication_between_server_client.py)

Debes realizar algunos ajustes en el código, en particular, en los datos de tu red Wi-Fi:

```python
ssid = "SSID"  # Reemplaza con el nombre de tu red Wi-Fi
password = "PASSWORD"  # Reemplaza con la contraseña de tu red Wi-Fi

```

También debes cambiar el host en la siguiente línea:

```python 
server_url = "http://tu_host:3000/endpoint" # Reemplaza con el nombre de la ip de tu servidor
```
Para conocer la dirección IP de tu dispositivo, en Windows, puedes abrir una terminal y ejecutar el comando:
> ipconfig

En la sección de "Adaptadores de red inalámbricos", encontrarás una entrada similar a:

```python 
Dirección IPv4. . . . . . . . . . . . . . : 192.168.0.2
```
Reemplaza tu_host por la dirección IP, por ejemplo:


```python 
server_url = "http://192.168.0.2:3000/endpoint" 
```
## Ejecutando el Programa
Una vez que hayas realizado las modificaciones en el código, puedes ejecutarlo. En la consola de Thonny, verás una dirección IP a la que puedes acceder para verificar si el ESP32 está conectado:

```yaml

MPY: soft reboot
Conectado a la red WiFi
Dirección IP: 192.168.0.10
Puedes acceder a esta dirección IP desde cualquier dispositivo en la misma red.
```
![ESP32](../img/SOY_EL_esp32.png)


La interfaz que se muestra controla el LED 25 de la ESP32 y permite comprobar la funcionalidad del proyecto.

Finalmente, el enlace con la interfaz integrada con el envío de información por el potenciómetro se verá algo como esto:

![Interfaz](../img/output.gif)

