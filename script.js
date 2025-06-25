unction updateDisplay() {
  document.getElementById("p1left").textContent = p1.left;
  document.getElementById("p1right").textContent = p1.right;
  document.getElementById("p2left").textContent = p2.left;
  document.getElementById("p2right").textContent = p2.right;
}

// 攻撃処理 三項演算子使ってみた
function attack(attacker, attackerHand, defender, defenderHand) {
  const atk = attacker === "p1" ? p1 : p2;
  const def = defender === "p1" ? p1 : p2;

  const amount = atk[attackerHand];

  // 攻撃対象が死んでいないか確認
  if (amount === 0 || def[defenderHand] === 0) {
    document.getElementById("message").textContent = "攻撃できません。";
    return;
  }

  def[defenderHand] += amount;

  // 5以上なら5を引く（ロールオーバー）
  if (def[defenderHand] >= 5) {
    def[defenderHand] -= 5;
  }

  updateDisplay();

  // 表示用の日本語メッセージ
  const attackerName = getPlayerLabel(attacker);
  const defenderName = getPlayerLabel(defender);
  const attackerHandLabel = getHandLabel(attackerHand);
  const defenderHandLabel = getHandLabel(defenderHand);

  document.getElementById("message").textContent =
    `${attackerName}の${attackerHandLabel}が${defenderName}の${defenderHandLabel}を攻撃！`;
}

// 分割処理（簡易版）
function split(player) {
  const obj = player === "p1" ? p1 : p2;
  const total = obj.left + obj.right;

  if (total % 2 === 0 && total > 0) {
    obj.left = total / 2;
    obj.right = total / 2;
    const playerName = getPlayerLabel(player);
    document.getElementById("message").textContent = `${playerName}が分割しました。`;
  } else {
    document.getElementById("message").textContent = "分割できません。";
  }

  updateDisplay();
}

// ゲームリセット
function resetGame() {
  p1 = { left: 1, right: 1 };
  p2 = { left: 1, right: 1 };
  updateDisplay();
  document.getElementById("message").textContent = "ゲームをリセットしました。";
}

// 初期表示
window.onload = updateDisplay;
