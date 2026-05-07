# Sentinel Security Console

Sentinel Security Console is a web-based internal dApp prototype designed for a **Blockchain Security Engineer** workflow. It helps simulate smart-contract risk triage, severity-based findings review, wallet-connected security attestation, and incident response readiness in a clean dashboard interface.

## Overview

This project was built as a frontend prototype for a blockchain security operations use case. Instead of focusing on end-user token transfers or NFT minting, it is designed around what a security engineer would actually need during review and incident workflows:

- Contract risk review
- Severity-based findings analysis
- Wallet-linked reviewer actions
- Security attestation flow
- Emergency pause drill simulation

## Features

- Multi-profile security review modes:
  - DeFi Vault
  - Bridge Escrow
  - NFT Marketplace
- Risk score dashboard
- Critical, high, medium, and low findings filter
- Privilege-path visibility
- Response readiness score
- Mock wallet connection flow
- Mock signed security attestation publishing
- Incident playbook rendering
- Light/dark theme toggle
- Responsive single-page layout

## Project Structure

```text
sentinel-security-console/
├─ index.html
├─ style.css
├─ script.js
└─ README.md
```

## Tech Stack

This prototype is intentionally simple and lightweight:

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts (Inter)
- Live Server for local preview
- Git + GitHub for version control

## Run Locally

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Use Live Server in VSCode

1. Open the project folder in VSCode
2. Right-click `index.html`
3. Click **Open with Live Server**

## Screenshots

> Add your screenshots inside a folder named `screenshots` in the root of the project.

Example structure:

```text
sentinel-security-console/
├─ index.html
├─ style.css
├─ script.js
├─ README.md
└─ screenshots/
   ├─ dashboard.png
   ├─ findings.png
   └─ mobile-view.png
```

Then use this format in README:

```md
## Screenshots

### Dashboard

### Findings Panel

### Mobile View
```

GitHub supports relative image paths in README files, so images stored in your repository can be rendered directly in Markdown. [web:43]

## Current Workflow

The current prototype supports the following simulated flow:

1. Open the dashboard
2. Select a chain and review profile
3. Enter or load a contract target
4. Run analysis
5. Review findings by severity
6. Connect a reviewer wallet
7. Publish a mock security attestation
8. Simulate a pause drill for incident response readiness

## Use Case

This prototype is aimed at the role of a Blockchain Security Engineer, Security Researcher, Smart Contract Auditor, or Protocol Security Analyst. It demonstrates how a security-focused dApp can be built around internal review operations rather than public-user interactions.

## Future Improvements

Planned upgrades for the next version:

- Real MetaMask integration
- `ethers.js` wallet connection
- Real contract metadata fetch
- Smart contract interaction layer
- IPFS or backend storage for attestation logs
- Slither/Mythril scan result ingestion
- Role graph visualization
- On-chain event monitoring
- GitHub Pages deployment
- React + Vite migration

## GitHub Setup

This project was pushed from VSCode using Git. If you want to clone and run it:

```bash
git clone https://github.com/YOUR_USERNAME/sentinel-security-console.git
cd sentinel-security-console
```

Then open the folder in VSCode and run `index.html` with Live Server.

## Deployment

This project can be deployed easily with **GitHub Pages** because it is a static frontend project. GitHub supports repository-hosted files and README documentation directly from the repository root. [web:43][web:34]

## Why this project matters

Most dApp examples focus on swaps, NFT mints, or token dashboards. Sentinel explores a different but important direction: internal security tooling for Web3 teams. It shows how blockchain products can be built for protocol defense, review workflows, and incident operations.

## Author

**Adarsh**  
Full-stack Blockchain Developer  
Exploring Web3, DeFi, NFTs, dApps, and cybersecurity

## License

This project is currently provided as a personal prototype. Add an open-source license later if you want others to reuse or contribute to the code.