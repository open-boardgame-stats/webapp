import React from "react";
import { useRouteMatch } from "react-router-dom";
import { terraformingMars } from "../../components/Game";
import TerraformingMarsMatch from "./terraforming-mars/Match";

interface MatchProps {
  gameId: string;
}

const MatchPage: React.FC = () => {
  const {
    params: { gameId },
  } = useRouteMatch<MatchProps>();
  switch (gameId) {
    default:
      return null;
  }
};

export default MatchPage;
