// プレイヤーの手の状態をオブジェクトで管理
let p1 = { left: 1, right: 1 };
let p2 = { left: 1, right: 1 };

// 画面表示用の日本語の名前と手を返す
function getPlayerLabel(player) {
  return player === "p1" ? "プレイヤー1" : "プレイヤー2";
}

function getHandLabel(hand) {
  return hand === "left" ? "左手" : "右手";
}

// 画面表示を更新する関数
function updateDisplay() {
  document.getElementById("p1left").textContent = p1.left;
  document.getElementById("p1right").textContent = p1.right;
  document.getElementById("p2left").textContent = p2.left;
  document.getElementById("p2right").textContent = p2.right;
}

// 攻撃する関数 三項演算子使ってみた
function attack(attacker, attackerHand, defender, defenderHand) {
  const atk = attacker === "p1" ? p1 : p2;
  const def = defender === "p1" ? p1 : p2;

  const amount = atk[attackerHand];

  // 攻撃する手、相手の手が死んでいないか確認
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
  // ＄を使って結合
  document.getElementById("message").textContent =
    `${attackerName}の${attackerHandLabel}が${defenderName}の${defenderHandLabel}を攻撃！`;
}

// 手を分割する関数
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

// ゲームをリセットする関数
function resetGame() {
  p1 = { left: 1, right: 1 };
  p2 = { left: 1, right: 1 };
  updateDisplay();
  document.getElementById("message").textContent = "ゲームをリセットしました。";
}

// 初期表示
window.onload = updateDisplay;
