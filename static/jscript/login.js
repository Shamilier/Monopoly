let docTitel = document.title;
window.addEventListener("blur", () =>{document.title = "Come Back :(";});
window.addEventListener("focus", () => {document.title = docTitel;});
const themes = [
    {
        background: "#1A1A2E",
        color: "#FFFFFF",
        primaryColor: "#0F3460"
    },
    {
        background: "#461220",
        color: "#FFFFFF",
        primaryColor: "#E94560"
    },
    {
        background: "#192A51",
        color: "#FFFFFF",
        primaryColor: "#967AA1"
    },
    {
        background: "#F7B267",
        color: "#000000",
        primaryColor: "#F4845F"
    },
    {
        background: "#F25F5C",
        color: "#000000",
        primaryColor: "#642B36"
    },
    {
        background: "#231F20",
        color: "#FFF",
        primaryColor: "#BB4430"
    }
];
const setTheme = (theme) => {
    const root = document.querySelector(":root");
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--glass-color", theme.glassColor);

    // Сохраняем выбранную цветовую схему в localStorage
    localStorage.setItem("selectedTheme", JSON.stringify(theme));
};

const displayThemeButtons = () => {
    const btnContainer = document.querySelector(".theme-btn-container");
    themes.forEach((theme) => {
        const div = document.createElement("div");
        div.className = "theme-btn";
        div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
        btnContainer.appendChild(div);

        div.addEventListener("click", () => {
            setTheme(theme); // Применяем цветовую схему
        });
    });
};

// При загрузке страницы проверяем, есть ли сохраненная цветовая схема в localStorage
document.addEventListener("DOMContentLoaded", function() {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme) {
        const parsedTheme = JSON.parse(selectedTheme);
        setTheme(parsedTheme); // Применяем сохраненную цветовую схему при загрузке страницы
    }
});

displayThemeButtons();

const RegisterLink = document.getElementById("RegisterLink");
RegisterLink.addEventListener("click", function(event) {
    event.preventDefault(); 
    RegisterLink.style.transform = "scale(1.1)"; 
    setTimeout(function() {
        window.location.href = "registration.html"; 
    }, 500); 
});

const ForgetLink = document.getElementById("ForgetLink");
ForgetLink.addEventListener("click", function(event) {
    event.preventDefault(); 
    ForgetLink.style.transform = "scale(1.1)"; 
    setTimeout(function() {
        window.location.href = "login_1.php"; 
    }, 500); 
});
