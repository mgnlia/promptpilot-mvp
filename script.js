const FREE_LIMIT = 3;

function getUsageKey() {
  const today = new Date().toISOString().slice(0, 10);
  return `pp_usage_${today}`;
}

function getUsage() {
  return Number(localStorage.getItem(getUsageKey()) || '0');
}

function setUsage(value) {
  localStorage.setItem(getUsageKey(), String(value));
}

function isPro() {
  return localStorage.getItem('pp_subscription') === 'pro';
}

function updateUi() {
  const usageText = document.getElementById('usageText');
  const badge = document.getElementById('planBadge');
  const upgradeBtn = document.getElementById('upgradeBtn');
  const usage = getUsage();

  if (!usageText || !badge) return;

  if (isPro()) {
    const plan = localStorage.getItem('pp_plan') || 'pro-monthly';
    badge.textContent = `Pro Plan (${plan})`;
    usageText.textContent = 'Unlimited generations enabled.';
    if (upgradeBtn) upgradeBtn.classList.add('hidden');
  } else {
    badge.textContent = 'Free Plan';
    usageText.textContent = `Free usage: ${usage}/${FREE_LIMIT} prompts used today.`;
    if (upgradeBtn && usage >= FREE_LIMIT) {
      upgradeBtn.classList.remove('hidden');
    }
  }
}

function generatePrompt(goal, audience, tone) {
  return [
    'You are an expert startup copywriter.',
    `Goal: ${goal || 'Improve conversion copy'}.`,
    `Audience: ${audience || 'SaaS decision-makers'}.`,
    `Tone: ${tone || 'Crisp and confident'}.`,
    'Return output in this format:',
    '1) Headline options (5)',
    '2) Supporting bullets (5)',
    '3) CTA variants (3)',
    '4) A/B test suggestion and expected impact',
  ].join('\n');
}

const btn = document.getElementById('generateBtn');
if (btn) {
  btn.addEventListener('click', () => {
    const usage = getUsage();
    const output = document.getElementById('output');

    if (!isPro() && usage >= FREE_LIMIT) {
      output.textContent = 'Free limit reached. Upgrade to Pro to continue.';
      updateUi();
      return;
    }

    const goal = document.getElementById('goal').value.trim();
    const audience = document.getElementById('audience').value.trim();
    const tone = document.getElementById('tone').value.trim();

    output.textContent = generatePrompt(goal, audience, tone);

    if (!isPro()) {
      setUsage(usage + 1);
    }

    updateUi();
  });
}

updateUi();