async function main() {
  // Obtenemos la cuenta del desplegador
  const [deployer] = await ethers.getSigners();

  console.log("Desplegando el contrato con la cuenta:", deployer.address);

  // Obtenemos el balance de la cuenta del desplegador
  const balance = await deployer.getBalance();
  console.log("Balance de la cuenta:", balance.toString());

  // Obtenemos la fábrica del contrato
  const PrestamoDeFi = await ethers.getContractFactory("PrestamoDeFi");
  const prestamoDeFi = await PrestamoDeFi.deploy();

  // Esperamos a que el contrato sea desplegado
  await prestamoDeFi.deployed();

  console.log("PrestamoDeFi desplegado en:", prestamoDeFi.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
