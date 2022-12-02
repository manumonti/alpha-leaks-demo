import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";
import {
  Cohort,
  Conditions,
  ConditionSet,
  Strategy,
} from "@nucypher/nucypher-ts";

function StrategyBuilder({ setDepStrategy }: any) {
  const strategyBuild = async () => {
    setDepStrategy("Deploying...");

    const cohortConfig = {
      threshold: 3,
      shares: 5,
      porterUri: "https://porter-tapir.nucypher.community",
    };

    const cohort = await Cohort.create(cohortConfig);

    const conditionSilver = new Conditions.ERC721Balance({
      contractAddress: "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b",
      chain: 5,
    });
    const conditionsSilver = new ConditionSet([conditionSilver]);

    const strategy = Strategy.create(cohort, conditionsSilver);

    const mmProvider = await detectEthereumProvider();
    const network = providers.getNetwork("maticmum");
    if (mmProvider) {
      const web3Provider = new providers.Web3Provider(mmProvider, network);
      const deployedStrategy = await strategy.deploy(
        `blog-subscription-${Math.floor(Math.random() * 100)}`,
        web3Provider
      );
      setDepStrategy(deployedStrategy);
    }
  };

  return (
    <button className="cbd-button" onClick={strategyBuild}>
      Step 2. Deploy Strategy
    </button>
  );
}

export default StrategyBuilder;
