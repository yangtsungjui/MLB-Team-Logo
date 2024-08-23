document.addEventListener("DOMContentLoaded", function() {
const questions = [
    ["巴爾的摩金鶯", "Baltimore Orioles", "figure//Baltimore_Orioles-Logo-PNG9.png"],
    ["波士頓紅襪", "Boston Red Sox", "figure//Boston_Red_Sox-Logo-PNG7.png"],
    ["紐約洋基", "New York Yankees", "figure//New_York_Yankees-Logo-PNG5.png"],
    ["坦帕灣光芒", "Tampa Bay Rays", "figure//Tampa_Bay_Rays-Logo-PNG7.png"],
    ["多倫多藍鳥", "Toronto Blue Jays", "figure//Toronto_Blue_Jays-PNG5.png"],
    ["芝加哥白襪", "Chicago White Sox", "figure//Chicago_White_Sox-Logo-PNG1.png"],
    ["克里夫蘭守護者", "Cleveland Guardians", "figure//Cleveland-Guardians-Logo-700x394.png"],
    ["底特律老虎", "Detroit Tigers", "figure//Detroit_Tigers-Logo-PNG4.png"],
    ["堪薩斯市皇家", "Kansas City Royals", "figure//Kansas_City_Royals-Logo-PNG7.png"],
    ["明尼蘇達雙城", "Minnesota Twins", "figure//Minnesota_Twins-Logo-PNG7.png"],
    ["休士頓太空人", "Houston Astros", "figure//Houston_Astros-Logo-PNG3.png"],
    ["洛杉磯天使", "Los Angeles Angels", "figure//Los_Angeles_Angels-Logo-PNG9.png"],
    ["奧克蘭運動家", "Oakland Athletics", "figure//Oakland_Athletics-Logo-PNG6.png"],
    ["西雅圖水手", "Seattle Mariners", "figure//Seattle_mariners_logo_PNG1.png"],
    ["德州遊騎兵", "Texas Rangers", "figure//Texas_Rangers-Logo-PNG5.png"],
    ["亞特蘭大勇士", "Atlanta Braves", "figure//Atlanta-Braves-Logo-700x394.png"],
    ["邁阿密馬林魚", "Miami Marlins", "figure//Miami_Marlins-Logo-PNG6.png"],
    ["紐約大都會", "New York Mets", "figure//New_York_Mets-Logo-PNG7.png"],
    ["費城費城人", "Philadelphia Phillies", "figure//Philadelphia_Phillies-Logo-PNG6.png"],
    ["華盛頓國民", "Washington Nationals", "figure//Washington_Nationals-Logo-PNG5.png"],
    ["芝加哥小熊", "Chicago Cubs", "figure//Chicago_Cubs-Logo-PNG3.png"],
    ["辛辛那提紅人", "Cincinnati Reds", "figure//Cincinnati_Reds-Logo-PNG4.png"],
    ["密爾瓦基釀酒人", "Milwaukee Brewers", "figure//Milwaukee_Brewers-Logo-PNG6.png"],
    ["匹茲堡海盜", "Pittsburgh Pirates", "figure//Pittsburgh_Pirates-Logo-PNG8.png"],
    ["聖路易紅雀", "St. Louis Cardinals", "figure//St_Louis_Cardinals-Logo-PNG8.png"],
    ["亞利桑那響尾蛇", "Arizona Diamondbacks", "figure//Arizona_Diamondbacks-Logo-PNG3.png"],
    ["科羅拉多洛磯", "Colorado Rockies", "figure//Colorado_Rockies-Logo-PNG1.png"],
    ["洛杉磯道奇", "Los Angeles Dodgers", "figure//Los_Angeles_Dodgers-Logo-PNG5.png"],
    ["聖地牙哥教士", "San Diego Padres", "figure//San_diego_padres_logo_PNG1.png"],
    ["舊金山巨人", "San Francisco Giants", "figure//San_Francisco_Giants-Logo-PNG7.png"]
];

    let currentQuestion = 0; // 目前的題目索引
    let score = 0; // 記錄答對的題數
    const disabledImages = new Set(); // 記錄已經答對的圖片

    // 隨機打亂陣列的順序
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(questions); // 將題目隨機打亂

    const questionElement = document.getElementById("question"); // 顯示題目的元素
    const hintElement = document.getElementById("hint"); // 提示文字的元素
    const imagesElement = document.getElementById("images"); // 顯示圖片按鈕的容器
    const hintButton = document.getElementById("hintButton"); // 提示按鈕

    // 載入並顯示當前的題目及選項
    function loadQuestion() {
        if (currentQuestion >= questions.length) {
            // 所有題目答完後顯示結果
            questionElement.textContent = `恭喜你，已完成所有題目！你答對了 ${score} 題。`;
            hintButton.style.display = "none"; // 隱藏提示按鈕
            hintElement.style.display = "none"; // 隱藏提示文字
            return;
        }

        questionElement.textContent = questions[currentQuestion][0]; // 顯示中文題目
        hintElement.textContent = `Hint: 隊伍的英文是 "${questions[currentQuestion][1]}"`; // 設置英文提示文字
        hintElement.style.display = "none"; // 預設隱藏提示
        imagesElement.innerHTML = ''; // 清空之前的按鈕

        // 為每個圖片創建按鈕
        questions.forEach(q => {
            const button = document.createElement("button");
            button.className = "image-btn";
            button.innerHTML = `<img src="${q[2]}" alt="Logo">`;

            // 如果該圖片已經答對過，則禁用按鈕並設置樣式
            if (disabledImages.has(q[2])) {
                button.classList.add("correct");
                button.disabled = true;
            }

            // 為按鈕添加點擊事件監聽器
            button.addEventListener("click", () => checkAnswer(button, q[2]));
            imagesElement.appendChild(button);
        });
    }

    // 檢查選擇的答案是否正確
    function checkAnswer(button, selectedImage) {
        const correctImage = questions[currentQuestion][2]; // 取得當前題目的正確圖片
        if (selectedImage === correctImage) {
            button.classList.add("correct"); // 標記正確答案
            button.disabled = true; // 禁用按鈕
            disabledImages.add(selectedImage); // 將正確圖片加入已答對集合
            score++; // 增加得分
            currentQuestion++; // 進入下一題
            setTimeout(loadQuestion, 1000); // 延遲1秒後載入下一題
        } else {
            button.classList.add("incorrect"); // 標記錯誤答案
        }
    }

    // 顯示提示文字
    hintButton.addEventListener("click", () => {
        hintElement.style.display = "block"; // 顯示提示文字
    });

    loadQuestion(); // 載入第一題
});