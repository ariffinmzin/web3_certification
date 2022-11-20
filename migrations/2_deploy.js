// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
const deployCertification = artifacts.require("Certification");

module.exports = function(deployer) {
  deployer.deploy(deployCertification);
};
