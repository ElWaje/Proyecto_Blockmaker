# PrestamoDeFi

`PrestamoDeFi` es un contrato inteligente implementado en Solidity para la red Ethereum, diseñado para gestionar un sistema de préstamos DeFi (Finanzas Descentralizadas). Este contrato permite a los usuarios solicitar préstamos, depositar y recuperar garantías, y a los administradores del sistema, aprobar préstamos, liquidar garantías y gestionar clientes y prestamistas.

## Características

- Registro de clientes y prestamistas: Gestiona el registro y la autorización de los participantes en el sistema.
- Depósito de garantías en Ether: Permite a los clientes depositar garantías en Ether.
- Depósito de fondos en el contrato: Habilita al socio principal a aportar fondos para financiar los préstamos.
- Solicitud y aprobación de préstamos: Facilita la solicitud de préstamos por parte de los clientes y su aprobación por los administradores.
- Reembolso de préstamos y liquidación de garantías: Permite a los clientes reembolsar sus préstamos y a los administradores liquidar garantías cuando sea necesario.
- Consultas de préstamos y detalles específicos: Ofrece la capacidad de consultar los préstamos existentes y sus detalles.

## Cómo Empezar

### Prerequisitos

- Ethereum wallet como [MetaMask](https://metamask.io/).
- [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) (para herramientas de desarrollo como [Truffle](https://www.trufflesuite.com/)).
- Conocimiento básico de Solidity y el entorno de desarrollo Ethereum.

### Instalación

- Clone el repositorio a su máquina local.
  ```bash
  git clone https://github.com/tuUsuario/PrestamoDeFi.git
- Instalar las dependencias necesarias.
  ```bash
  npm install
  
### Despliegue

Para desplegar este contrato en una red de prueba (testnet) como Rinkeby o en la red principal (mainnet), puede utilizar herramientas como Remix, Truffle o Hardhat.

- Usando Remix.
- Abra Remix.
- Cree un nuevo archivo y copie el contenido del contrato PrestamoDeFi.sol en este.
- Compile el contrato usando la versión de compilador correspondiente.
- Conecte Remix con su Ethereum wallet.
- Despliegue el contrato en la red deseada.

### Uso

#### Funciones

- altaPrestamista:
function altaPrestamista(address nuevoPrestamista) public soloSocioPrincipal:
Registra un nuevo prestamista en el sistema.

- altaCliente:
function altaCliente(address nuevoCliente) public soloEmpleadoPrestamista:
Registra un nuevo cliente en el sistema.

- depositarGarantia-
function depositarGarantia() public payable soloClienteRegistrado:
Permite a los clientes depositar garantías en Ether.

- depositarFondos-
function depositarFondos() public payable soloSocioPrincipal:
Permite al socio principal depositar Ether en el contrato para financiar los préstamos.

- consultarFondos-
function depositarFondos() public payable soloSocioPrincipal:
Permite al socio principal consultar los fondos disponibles en el contrato.

- solicitarPrestamo-
function solicitarPrestamo(uint256 monto, uint256 plazo) public soloClienteRegistrado returns (uint256):
Permite a los clientes registrados solicitar un préstamo.

- aprobarPrestamo-
function aprobarPrestamo(address prestatario, uint256 id) public soloEmpleadoPrestamista:
Permite a los empleados prestamistas aprobar préstamos pendientes.

- reembolsarPrestamo-
function reembolsarPrestamo(uint256 id) public soloClienteRegistrado:
Permite a los clientes reembolsar sus préstamos.

- liquidarGarantia-
function liquidarGarantia(address prestatario, uint256 id) public soloEmpleadoPrestamista:
Permite a los empleados prestamistas liquidar la garantía de préstamos no reembolsados después de su vencimiento.

- solicitarDevolucionGarantia-
function solicitarDevolucionGarantia() public soloClienteRegistrado:
Permite a los clientes solicitar la devolución de su garantía, siempre que no tengan préstamos aprobados sin reembolsar o liquidar. 

## Licencia

Distribuido bajo la Licencia MIT. Vea LICENSE para más información.

## Contacto

Enrique Solis - elwaje@gmail.com

Link del Proyecto: https://github.com/ElWaje/PrestamoDefi
