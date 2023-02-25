const Timelock = artifacts.require("Timelock")
const UFTG = artifacts.require("UFT_Governance_Token")
const GovernorBravoDelegate = artifacts.require("GovernorBravoDelegate")
const GovernorBravoDelegator = artifacts.require("GovernorBravoDelegator")


module.exports = async function(deployer) {
  deployer
  .then(async () => {
    let admin = '0x6dc6456B093551eFf2Dc40002A0367258a8bAC33'
    let UFT = '0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1'
    let delay = '172800';
    let votingPeriod = '17280';
    let votingDelay = '1';
    let proposalThreshold = '1000000000000000000000000';
    

    // Deploy timelock contract
    await deployer.deploy(Timelock, admin, delay)
    const TimelockContract = await Timelock.deployed()
    console.log("Timelock contract deployement done:", Timelock.address)


    // Deploy UFTG token
    await deployer.deploy(UFTG, UFT)
    const UFTG_Contract = await UFTG.deployed()
    console.log("GovernorBravoDelegate contract deployement done", UFTG_Contract.address)


    // Deploy GovernorBravoDelegate contract
    await deployer.deploy(GovernorBravoDelegate)
    const GovernorBravoDelegateContract = await GovernorBravoDelegate.deployed()
    console.log("GovernorBravoDelegate contract deployement done", GovernorBravoDelegateContract.address)


    // Deploy GovernorBravoDelegator contract
    await deployer.deploy(GovernorBravoDelegator, 
      Timelock.address,
      UFTG_Contract.address,  
      admin, 
      GovernorBravoDelegateContract.address, 
      votingPeriod, 
      votingDelay, 
      proposalThreshold
    )
    const GovernorBravoDelegatorContract = await GovernorBravoDelegator.deployed()
    console.log("GovernorBravoDelegator contract deployement done", GovernorBravoDelegatorContract.address)
  })
}
