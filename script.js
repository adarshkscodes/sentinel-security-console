const profiles = {
  defi: {
    score: 64,
    readiness: 71,
    privilege: 3,
    findings: [
      {
        severity: "critical",
        title:
          "Privileged upgrade path can swap implementation without timelock",
        detail:
          "Proxy admin can upgrade instantly. Add timelock, multisig, and upgrade simulation gates.",
        owner: "Access Control",
      },
      {
        severity: "critical",
        title:
          "External call before full accounting update creates reentrancy risk",
        detail:
          "Move state updates before token transfer and guard high-value entry points.",
        owner: "Execution Flow",
      },
      {
        severity: "high",
        title: "Oracle heartbeat not enforced during vault health checks",
        detail:
          "Reject stale rounds and add sequencer uptime checks where applicable.",
        owner: "Oracle Safety",
      },
      {
        severity: "medium",
        title: "Pause mechanism excludes reward-claim path",
        detail: "Emergency controls should cover all asset-moving functions.",
        owner: "Incident Response",
      },
    ],
    playbook: [
      "Freeze deposits and redemptions through guarded pause path.",
      "Rotate guardian and upgrade signer permissions to incident multisig.",
      "Invalidate stale oracle reads and switch to fallback source.",
      "Publish signed incident note with attack surface summary.",
    ],
  },
  bridge: {
    score: 79,
    readiness: 58,
    privilege: 4,
    findings: [
      {
        severity: "critical",
        title: "Relayer quorum threshold is too low for escrow release",
        detail:
          "Increase signer threshold and separate hot from cold release paths.",
        owner: "Bridge Ops",
      },
      {
        severity: "critical",
        title: "Replay domain separator missing in withdrawal approval payload",
        detail: "Bind signatures to chain id, contract, and nonce.",
        owner: "Signature Safety",
      },
      {
        severity: "high",
        title: "Emergency shutdown can be bypassed through legacy executor",
        detail: "Route all message execution through a shared kill-switch.",
        owner: "Emergency Controls",
      },
      {
        severity: "medium",
        title: "Watcher liveness alerting not defined",
        detail: "Define watchdog windows and escalation to incident commander.",
        owner: "Monitoring",
      },
    ],
    playbook: [
      "Stop new message relay and isolate release signers.",
      "Invalidate outstanding approvals with nonce bump.",
      "Move treasury coverage to contingency wallet set.",
      "Publish bridge integrity attestation to stakeholder channel.",
    ],
  },
  nft: {
    score: 42,
    readiness: 83,
    privilege: 2,
    findings: [
      {
        severity: "high",
        title: "Royalty recipient can be changed by single owner key",
        detail:
          "Move payout updates behind multisig approval and event alerts.",
        owner: "Admin Governance",
      },
      {
        severity: "medium",
        title: "Marketplace signature validity lacks expiry by default",
        detail: "Add deadlines to off-chain listing signatures.",
        owner: "Order Safety",
      },
      {
        severity: "low",
        title:
          "Operator filter events are not indexed for rapid incident forensics",
        detail: "Index admin-changing and operator-setting events.",
        owner: "Observability",
      },
    ],
    playbook: [
      "Disable listing execution and new approvals in marketplace module.",
      "Alert creators and collection admins about changed control surface.",
      "Rotate payout admin and freeze metadata mutability if needed.",
      "Publish attested marketplace status update.",
    ],
  },
};

let walletConnected = false;
let currentProfile = "defi";
let currentFindings = profiles[currentProfile].findings;
let theme = "dark";

const els = {
  walletBtn: document.getElementById("walletBtn"),
  publishBtn: document.getElementById("publishBtn"),
  publishTopBtn: document.getElementById("publishTopBtn"),
  pauseBtn: document.getElementById("pauseBtn"),
  scanBtn: document.getElementById("scanBtn"),
  clearBtn: document.getElementById("clearBtn"),
  loadDemoBtn: document.getElementById("loadDemoBtn"),
  profileSelect: document.getElementById("profileSelect"),
  severityFilter: document.getElementById("severityFilter"),
  findingList: document.getElementById("findingList"),
  txLog: document.getElementById("txLog"),
  playbookList: document.getElementById("playbookList"),
  riskScore: document.getElementById("riskScore"),
  criticalCount: document.getElementById("criticalCount"),
  privilegeCount: document.getElementById("privilegeCount"),
  readinessScore: document.getElementById("readinessScore"),
  headlineScore: document.getElementById("headlineScore"),
  riskBar: document.getElementById("riskBar"),
  contractInput: document.getElementById("contractInput"),
};

function severityClass(sev) {
  return sev === "critical"
    ? "critical"
    : sev === "high"
      ? "high"
      : sev === "medium"
        ? "medium"
        : "low";
}
function criticalCount(list) {
  return list.filter((f) => f.severity === "critical").length;
}
function mockHash() {
  return (
    "0x" +
    Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("") +
    "..." +
    Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("")
  );
}

function renderFindings() {
  const filter = els.severityFilter.value;
  const list = currentFindings.filter((f) =>
    filter === "all" ? true : f.severity === filter,
  );
  els.findingList.innerHTML =
    list
      .map(
        (f) => `
    <article class="finding">
      <div class="finding-top">
        <strong>${f.title}</strong>
        <span class="badge ${severityClass(f.severity)}">${f.severity}</span>
      </div>
      <div class="small muted">${f.owner}</div>
      <p class="small" style="margin-top:.55rem">${f.detail}</p>
    </article>
  `,
      )
      .join("") ||
    `<div class="finding"><p class="small muted">No findings match this severity filter.</p></div>`;
}

function renderPlaybook(items) {
  els.playbookList.innerHTML = items
    .map(
      (item, i) => `
    <div class="playbook-item">
      <div class="check">${i + 1}</div>
      <div>${item}</div>
    </div>`,
    )
    .join("");
}

function applyProfile(name) {
  currentProfile = name;
  const p = profiles[name];
  currentFindings = p.findings;
  els.riskScore.textContent = p.score;
  els.headlineScore.textContent = p.score;
  els.criticalCount.textContent = criticalCount(p.findings);
  els.privilegeCount.textContent = p.privilege;
  els.readinessScore.textContent = p.readiness + "%";
  els.riskBar.style.width = p.score + "%";
  renderFindings();
  renderPlaybook(p.playbook);
}

function pushTx(type, detail) {
  const item = document.createElement("div");
  item.className = "tx";
  item.innerHTML = `<div style="display:flex;justify-content:space-between;gap:1rem"><strong>${type}</strong><span class="badge low">logged</span></div><div class="small muted" style="margin-top:.35rem">${detail}</div><div class="mono small" style="margin-top:.45rem">${mockHash()}</div>`;
  els.txLog.prepend(item);
}

function connectWallet() {
  walletConnected = !walletConnected;
  els.walletBtn.textContent = walletConnected
    ? "0xB4cE...91f2"
    : "Connect Wallet";
  pushTx(
    walletConnected ? "Wallet connected" : "Wallet disconnected",
    walletConnected
      ? "Reviewer session ready for signed attestation."
      : "Reviewer session closed.",
  );
}

function publishAttestation() {
  if (!walletConnected) {
    connectWallet();
  }
  const chain = document.getElementById("chainSelect").value;
  const profile =
    els.profileSelect.options[els.profileSelect.selectedIndex].text;
  pushTx(
    "Security attestation published",
    `${profile} on ${chain} signed with current reviewer wallet. Snapshot anchored with risk score ${els.riskScore.textContent}.`,
  );
}

function simulatePause() {
  const p = profiles[currentProfile];
  pushTx(
    "Pause drill executed",
    `Emergency sequence simulated for ${currentProfile} profile. Readiness ${p.readiness}%.`,
  );
}

document.querySelector("[data-theme-toggle]").addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", theme);
});

els.walletBtn.addEventListener("click", connectWallet);
els.publishBtn.addEventListener("click", publishAttestation);
els.publishTopBtn.addEventListener("click", publishAttestation);
els.pauseBtn.addEventListener("click", simulatePause);
els.scanBtn.addEventListener("click", () =>
  applyProfile(els.profileSelect.value),
);
els.loadDemoBtn.addEventListener("click", () => {
  els.profileSelect.value = "defi";
  applyProfile("defi");
});
els.clearBtn.addEventListener("click", () => {
  document.getElementById("severityFilter").value = "all";
  document.getElementById("threatNote").value = "";
  els.contractInput.value = "";
  els.txLog.innerHTML = "";
  renderFindings();
});
els.profileSelect.addEventListener("change", (e) =>
  applyProfile(e.target.value),
);
els.severityFilter.addEventListener("change", renderFindings);

applyProfile("defi");
pushTx(
  "Prototype booted",
  "Demo dataset loaded. Ready for contract triage and signed attestation flow.",
);
