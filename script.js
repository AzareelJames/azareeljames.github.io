const input = document.getElementById("input");
const script = document.getElementById("script");
const path = document.getElementById("path");

input.focus();

function write(txt, color="white"){
    script.innerHTML += `<span style="color: ${color}"><xmp>${txt}</xmp></span>`
}


write("azareeljames.github.io prompt");
write("Welcome to prompt! Type 'help' to list all of the commands.");
write("Go to https://github.com/AzareelJames/", "lime");
write("Note: this is a console, whenever you type console.log in devtools, it shows up in the command.", "cyan");
write("--------------------------------------------------");

console.log = x => write(x);
console.info = x => write(x, "cyan");
console.warn = x => write(x, "yellow");
console.error = x => write(x, "red");
console.clear = () => script.innerHTML = "";
console.dir = x => write(x);

if(!navigator.onLine){
    console.info("WI-FI is off.");
}

let times = 0;
let batterySupported = false;

async function getBattery(){
    if("getBattery" in navigator){
        batterySupported = true;

        navigator.getBattery().then(bat => {
            globalThis.battery = bat;
        })
    }
}

getBattery();

input.addEventListener("keydown", e => {
    if(e.key !== "Enter") return;
    const cmd = String(input.value).trim();

    write(`${path.innerText} ${cmd}`, "orange");

    for(let i of cmd.split("||")){
    const cmdVar = i.split("@")[0];
    let cmdVal = i.split("@")[1];

    if(cmdVal === undefined) cmdVal = "";

    if(i === "datetime"){
        write(`Current datetime: ${new Date().toLocaleString()}`);
    } else if(cmdVar === "open"){
        try{
            window.open(cmdVal);
        } catch(E){
            write(E, "red");
        }

        setTimeout(() => {
            if(document.hidden){
                write("Tab Opened", "lime");
            } else{
                write("Failed to open this tab. Please check your URL.", "red");
            }
        }, 1);
    } else if(i === "clear"){
        script.innerHTML = "";
    } else if(i === "developer"){
        if(times === 7){
            console.info("You're already a developer.");

            input.value = "";
            input.focus();

            return;
        }

        if(times === 6){
            path.innerText = "azareeljames.github.io/developer >>>";

            console.info("You're a developer now. Try typing 'dev@help'.");
            console.warn("Note: dev@js@[JS Code] don't store data and is dangerous. Be careful!");
        }

        times++;
    } else if(cmdVar === "dev"){
        const devVar = i.split("@")[1];
        let devVal = i.split("@")[2];

        if(devVal === undefined)  devVal = "";

        if(times === 7){
            if(devVar === "js"){
                try{
                    write(eval(devVal), "gray");
                } catch(E){
                    write(E, "red");
                }
            } else if(cmdVal === "cancel"){
                times = 0;
                path.innerText = "azareeljames.github.io >>>";
                console.info("You're not a developer anymore.");
            } else if(devVar === "bg color"){
                document.body.style.backgroundColor = devVal;
            } else if(cmdVal === "prank"){
                write("Hacking...", "lime");

                globalThis.prank = setInterval(() => {
                    const bin = [1011011, 1010101011, 101010010101, 101010101,
                        10101001, 1010101010, 10011110101, 10010000111, 1010101001,
                        1010101001010001, 1010101, 1011111, 10101001, 1001, 11010111,
                        10101001, "0011110111", 10101, "000001111", "01110101011",
                        "0101001011", "010010101111", "01010010101001", "0100101111",
                        "000111111010101010", 101010100111, 1110111, 10101010, "0111011",
                        "010101001011", "000110111", "0110101101"
                    ];

                    write(bin[Math.floor(Math.random() * bin.length)], "lime");
                    
                    window.scrollTo(0, document.body.scrollHeight);
                });
            } else if(cmdVal === "stop"){
                try{
                    clearInterval(globalThis.prank);
                    write("Stopped Hacking.", "lime");
                } catch{
                    0;
                }
            } else if(cmdVal === "help"){
                write("Commands for developers:");
                write("dev@js@[JS Code] - Execute JS Code but this might be hacking");
                write("dev@cancel - Turns of developer mode");
                write("dev@bg color@[BG Color] - Changes BG Color (You can use Hex code, hsl(), or rgb())");
                write("dev@prank - This will make friends thinking you're hacking, use 'dev@stop' to stop.");
            }

            else{
                write(`${cmdVal} is not found in the dev list. Try typing 'dev@help' to see all commands.`, "red");
            }
        } else{
            console.warn("You're not a developer.");
        }
    } else if(i === "close"){
        window.close();

        setTimeout(() => console.warn("Cannot fully close the window."), 25);
    } else if(cmdVar === "google"){
        window.open(`https://www.google.com/search?q=${cmdVal}`);

        setTimeout(() => {
            if(document.hidden){
                write("Google Opened.", "lime");
            } else{
                write("Failed to search on google, maybe the popup is blocked...", "red");
            }
        }, 1);
    } else if(cmdVar === "google ai mode"){
        window.open(`https://www.google.com/search?udm=50&aep=46&source=25q2-US-SearchSites-Site-CTA&q=${cmdVal}`);

        setTimeout(() => {
            if(document.hidden){
                write("Google AI Mode Opened", "lime");
            } else{
                write("Failed to ask Google AI Mode, maybe the popup is blocked...", "red");
            }
        }, 1);
    } else if(i === "reload"){
        try{
            window.location.reload();
        } catch{
            console.error("Cannot fully reload the prompt.");
        }
    } else if(cmdVar === "bing"){
        window.open(`https://www.bing.com/search?q=${cmdVal}`);

        setTimeout(() => {
            if(document.hidden){
                write("Bing Opened", "lime");
            } else{
                write("Failed to search on bing, maybe the popup is blocked...", "red");
            }
        }, 1);
    } else if(cmdVar === "copilot"){
        window.open(`https://www.bing.com/copilotsearch?q=${cmdVal}`);

        setTimeout(() => {
            if(document.hidden){
                write("Copilot Opened", "lime");
            } else{
                write("Failed to ask copilot, maybe the popup is blocked...", "red");
            }
        }, 1);
    } else if(cmdVar === "fetch"){
        if(!cmdVal){
            console.error("Value required.");
        } else{

        console.info("Fetching...");

        async function tryFetch(){
            const response = await fetch(cmdVal).catch(E => {
                console.error(`Cannot Fetch: ${E}`);
            });

            const data = await response.text();

            write(data);

            window.scrollTo(0, document.body.scrollHeight);
        }

        tryFetch();
    }
    } else if(cmdVar === "msg"){
        console.log(cmdVal);
    } else if(cmdVar === "alert"){
        setTimeout(() => window.alert(cmdVal), 50);
    } else if(cmdVar === "google help"){
        window.open(`https://support.google.com/search?q=${cmdVal}`);

        setTimeout(() => {
            if(document.hidden){
                write("Google help Opened", "lime");
            } else{
                write("Failed to open google help, maybe the popup is blocked...", "red");
            }
        }, 1);
    } else if(cmdVar === "microsoft support"){
        window.open(`https://support.microsoft.com/search/results?query=${cmdVal}`);

        setTimeout(() => {
            if(document.hidden){
                write("Microsoft support Opened", "lime");
            } else{
                write("Failed to open microsoft support, maybe the popup is blocked...", "red");
            }
        }, 1);
    } else if(i === "6 7" || i === "67" || i === "six seven"){
        write("DID YOU JUST SAY...");

        setTimeout(() => {write("SIX SEVEN!!!!!!!!", "lime")}, 1870);
    } else if(i === "battery"){
        if(batterySupported){
            write(`Battery Percentage: ${globalThis.battery.level * 100}${globalThis.battery.charging? "⚡︎": ""}`);
        } else{
            console.error("Battery not supported");
        }
    } else if(i === "browser"){
        write("Browser Details");
        write("-----------------------");
        write(`This App version: ${navigator.appVersion}`);
        write(`Cookies Enabled: ${navigator.cookieEnabled}`);
        write(`Language: ${navigator.language}`);
        write(`Battery API Supported: ${"getBattery" in navigator}`);
        write(`WI-FI On: ${navigator.onLine}`);
        write(`Java Enabled: ${navigator.javaEnabled()}`);
    } else if(cmdVar === "spotify"){
        window.open(`https://open.spotify.com/track/${cmdVal}`);

        setTimeout(() => {
            if(document.hidden){
                write("Spotify Opened", "lime");
            } else{
                write("Failed to open Spotify, maybe the popup is blocked...", "red");
            }
        }, 1);
    } else if(i === "fullscreen"){
        try{
            document.documentElement.requestFullscreen();
        } catch{
            console.error("Cannot set this to fullscreen.");
        }
    } else if(cmdVar === "calc"){
        if(!cmdVal){
            try{
                window.open("calculator:");
            } catch{
                console.error("Expression required.");
            }
        } else{
            if(/^[0-9+\-*/()]*$/.test(cmdVal)){
                try{
                    write(eval(cmdVal), "lime");
                } catch{
                    console.error("This Expression is invalid");
                }
            } else{
                console.error("This Expression is invalid");
            }
        }
    } else if(cmdVar === "img"){
        script.innerHTML += `<img src="${cmdVal}" alt="Image">`;
    } else if(i === "voyager 1"){
        write("NASA Voyager 1 Distance from Earth");
        write("https://science.nasa.gov/mission/voyager/voyager-1/");
        write("----------------------");

        const now = new Date().getTime() / 1000;
        const launched = new Date(1977, 9, 5, 9, 56).getTime() / 1000;
        const miles = (now - launched) * 10.39083;

        write(`Today: ${new Date().toLocaleString()}`);
        write(`Miles: ~${miles.toLocaleString()}`);
        write(`Kilometers: ~${(miles * 1.609).toLocaleString()}`);
        write(`AU: ~${(miles / 9.296e+7).toLocaleString()}`);
    } else if(i === "voyager 2"){
        write("NASA Voyager 2 Distance from Earth");
        write("https://science.nasa.gov/mission/voyager/voyager-2/");
        write("----------------------");

        const now = new Date().getTime() / 1000;
        const launched = new Date(1977, 8, 20, 11, 29).getTime() / 1000;
        const miles = (now - launched) * 8.6458;

        write(`Today: ${new Date().toLocaleString()}`);
        write(`Miles: ~${miles.toLocaleString()}`);
        write(`Kilometers: ~${(miles * 1.609).toLocaleString()}`);
        write(`AU: ~${(miles / 9.296e+7).toLocaleString()}`);
    } else if(cmdVar === "windows open"){
        if(!navigator.userAgent.includes("Windows")){
            console.error("Sorry, this command is only for windows os.");
        } else{
            try{
                if(!cmdVal){
                    window.open("ms-settings:");
                } else{
                    window.open(`${cmdVal}:`);
                }

                setTimeout(() => {
                    if(document.hidden){
                        write("Windows app Opened", "lime");
                    } else{
                        write("Failed to open, maybe the popup is blocked...", "red");
                    }
        }, 1);
            } catch{
                console.error("Something went wrong...");
            }
        }
    } else if(i === "help"){
        write("All commands:");
        write("datetime - Shows the date and time");
        write("open@[URL] - Opens URL");
        write("clear - Clears the terminal");
        write("developer - repeat it 7 times to become a developer.");
        write("close - closes the prompt");
        write("google@[Google Search] - Opens google with search");
        write("google ai mode@[Prompt] - Opens google ai mode with prompt");
        write("reload - Reloads the window");
        write("bing@[Bing Search] - Opens bing with search");
        write("copilot@[Prompt] - Opens ms copilot with prompt");
        write("fetch@[Source] - Fetches the source");
        write("msg@[Message] - Logs the message");
        write("alert@[Message] - Shows the message");
        write("google help@[Search] - Opens google help with search");
        write("microsoft support@[Search] - Opens ms support with search");
        write("battery - Shows the battery percentage");
        write("browser - Shows the browser details");
        write("spotify@[ID] - Opens Spotify with ID Song");
        write("fullscreen - sets window on fullscreen");
        write("calc@[Expression] - Calculates the Expression");
        write("img@[Source] - Logs the image");
        write("voyager 1 - Current Distance between Voyager 1 to Earth");
        write("voyager 2 - Current Distance between Voyager 2 to Earth");
        write("windows open@[Windows app] - Opens the app (Only for Windows os)");
        write("help - Shows all the commands");
    }


    else{
        if(!i){
            write("");
            input.value = "";
            window.scrollTo(0, document.body.scrollHeight);
            input.focus();

            continue;
        }

        write(`${i} is not found in the list. Try typing 'help' to see all commands.`, "red");
        console.error("* Check the spelling");
        console.error("* Always on lowercase");
        console.error("* Maybe it didn't exist");
    }
  
    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
    input.focus();
}
});

window.addEventListener("online", () => console.info("WI-FI is on."));

window.addEventListener("offline", () => console.info("WI-FI is off."));

