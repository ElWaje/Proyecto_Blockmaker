from PyQt5.QtWidgets import QDialog, QFormLayout, QLineEdit, QLabel, QPushButton, QMessageBox
from web3 import Web3  

class CredencialesDialog(QDialog):
    def __init__(self, parent=None):
        super(CredencialesDialog, self).__init__(parent)
        self.setWindowTitle("Ingresar Credenciales\nPara Operar")
        self.setupUI()

    def setupUI(self):
        layout = QFormLayout()
        self.direccionEthereum = QLineEdit(self)
        layout.addRow(QLabel("Dirección Ethereum:"), self.direccionEthereum)

        self.clavePrivada = QLineEdit(self)
        self.clavePrivada.setEchoMode(QLineEdit.Password)
        layout.addRow(QLabel("Clave Privada:"), self.clavePrivada)

        botonAceptar = QPushButton('Aceptar', self)
        botonAceptar.clicked.connect(self.onAceptarClicked)
        layout.addRow(botonAceptar)

        self.setLayout(layout)

    def onAceptarClicked(self):
        direccion = self.direccionEthereum.text()
        if not Web3.is_address(direccion):
            QMessageBox.warning(self, "Error", "La dirección Ethereum no es válida.")
            return
        self.accept()

    def getDireccionEthereum(self):
        return self.direccionEthereum.text()

    def getClavePrivada(self):
        return self.clavePrivada.text()
    