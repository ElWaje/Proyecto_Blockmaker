from PyQt5.QtWidgets import QApplication
from MainWindow import MainWindow
from BlockchainManager import BlockchainManager
import os
from dotenv import load_dotenv

def main():
    # Carga las variables de entorno desde el archivo .env
    load_dotenv()

    # Extrae las variables de entorno necesarias
    ganache_url = os.getenv('GANACHE_URL')
    contract_address = os.getenv('CONTRACT_ADDRESS')
    abi_path = os.getenv('ABI_PATH')
    socio_principal_address = os.getenv('SOCIO_PRINCIPAL_ADDRESS')
    socio_principal_private_key = os.getenv('SOCIO_PRINCIPAL_PRIVATE_KEY')

    # Inicializa la aplicación Qt y BlockchainManager con las configuraciones
    app = QApplication([])
    
    blockchainManager = BlockchainManager(
        ganache_url=ganache_url,
        contract_address=contract_address,
        abi_path=abi_path,
        socio_principal_address=socio_principal_address,
        socio_principal_private_key=socio_principal_private_key  
    )
    mainWindow = MainWindow(blockchainManager)
    mainWindow.show()
    app.exec_()

if __name__ == "__main__":
    main()