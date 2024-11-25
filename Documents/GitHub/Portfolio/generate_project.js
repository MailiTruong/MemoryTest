/**
 * @class       : generate_project
 * @author      : mailitg (mailitg@$HOSTNAME)
 * @created     : Sunday Nov 17, 2024 18:16:04 CET
 * @description : generate_project
 */


class Project 
{
        constructor(name, image_path, description, skills, gif_path, github_link, features) 
        {
                this.name = name;
                this.image_path = image_path;
                this.description = description;
                this.skills= skills
                this.gif_path = gif_path;
                this.github_link = github_link;
                this.features = features;
        }

        create_preview() 
        {
                const projectSlug = this.name.replace(/\s+/g, '-').toLowerCase(); 
                return `
                    <div class="project-preview">
                        <a href="project.html?project=${projectSlug}">
                                <div id="img-container">
                                        <img src="${this.image_path}" alt="${this.title}"/>
                                </div>
                        </a>
                        <h2>${this.name}</h2>
                        <p>${this.description.substring(0, 50)}...</p>
                        <a href="project.html?project=${projectSlug}">View More</a>
                    </div>
                `;
        }

        create_project_page()
        {
                return `
                        <h1>${this.name}</h1>
                        <div class="overview">
                                <div id="skills">
                                <h3>Skills</h3>
                                <p>${this.skills}</p>
                                </div>
                                <div id="description">
                                <h3>Overview</h3>
                                <p>${this.description}</p>
                                </div>
                        </div>
                        <div class="gif">
                                <div id="gif-container">
                                        <img src="${this.gif_path}" alt="${this.title}"/>
                                </div>
                        </div>
                        <div class="features">
                                <div id="img-container">
                                        <img src="${this.image_path}" alt="${this.title}"/>
                                </div>
                                <div id="text">
                                        <h3>Features</h3>
                                        <p>${this.features}</p>
                                        <p>You can know more on my <a href='${this.github_link}' target='blank'>GitHub</a></p>
                                </div>
                        </div>
                `;

        }

}

class Fact 
{
        constructor(name, description) 
        {
                this.name = name;
                this.description = description;
        }

        create_fact() 
        {
                return `
                    <div class="fact-preview">
                        <h2>${this.name}</h2>
                        <p>${this.description}</p>
                    </div>
                `;
        }

}

const facts = [
        new Fact("Fact 1", "I have always been really competitive so I paricipated in piano, swimming, mathematics and taekwondo competitions. I mostly won but also learned how to handle defeat throughout the years."),

        new Fact("Fact 2", "I love to learn new skills, I studied Japanese on my own and now I know the basics of the language, I learned how to crochet, sew and wooven on my own so I can basically do any cloth I want."),

        new Fact("Fact 3", "I love cinema and one of my favorite movies is 'Dead poets society'. I also love reading and my favorite book is 'To kill a mockingbird'. And finally my favorite anime is 'Code Geass'"),

        new Fact("Fact 4", "You can know more on my <a href='./Maïli_Truong_resume.pdf' target='blank'>curriculum vitae</a>"),
];


const projects = [
        new Project("Droppy-Interactive Weather Visualization",
                "projects/Droppy/droppy.png",
                "Droppy is an interactive weather visualization tool that displays dynamic weather data along with visual elements such as snow, rain and the position of the sun based on time, using WebGL. It allows users to input a location URL, fetch weather data, and view it with real-time rendering on a 3D canvas, if it's daytime, raining, having a bright blue sky and so on. For the moment I can only do the research using URLs from this website The Weather Channel but the goal will be to be able to use an API so that the user doesn't have to copy the URL himself and have more realist graphism.",
        "Javascript, GLSL, Ray marching, WebGl",
        "projects/Droppy/Ray_gif.gif",
        "https://github.com/MailiTruong/RayMarching.git",
        "Dynamic weather visualization, Real-time data fetching, Interactive canvas, Dynamic sun position visualization"),
        
        new Project("StackRush",
                "projects/StackRush/Stackrush.png",
                "StackRush is a vintage pixel game made with pygame where you have to stack blocks according to the tempo of a metronome that accelerates as precisely as possible to achieve high scores and be on the podium ! You can either play it with a small controller or on you keyboard !",
                "Python, Arduino",
                "projects/StackRush/StackRush.gif",
                "https://github.com/MailiTruong/ComputeSci/tree/main/Week3/StackRush",
                "Gameplay, Controller, Data interpretation"),

        new Project("Shadow ballet",
                "projects/Shadow_ballet/shadow.jpeg",
                "Shadow ballet made from scratch wether it is building the setting, doing the choreography, the dancing and the acting.",
                "Video editing, Dancing, Piano, Acting, Show making",
                "projects/Shadow_ballet/shadow.gif",
                "https://github.com/MailiTruong",
                "Cutted text boxes, object empilement to cast different forms of shadows"),

        new Project("Small gameboy",
                "projects/Small_gameboy/kic.png",
                "Making a small game boy, learning how to design the PCB to solderingeach of the electronic components to finally making a networked multiplayer game implemented for ESP-based devices. The game is a variation of the game of Nim in a shape of a rotating flower.",
                "C++, C, Wifi access point, Soldering, Kicad",
                "projects/Small_gameboy/Flower.gif",
                "https://github.com/MailiTruong/FlowerGame.git",
                "You can either join or host a party (via WIFI access point),OLED Display interaction, You can rotate the flower and choose which petal to pick, The updates are made in real-time, You can control via a 3x3 keypad matrix."),
        
        new Project("Transconnect",
                "projects/Transconnect/mili.png",
                "A C# console application for managing your society.",
                "C#, Djikstra algorithm",
                "projects/Transconnect/mili.gif",
                "https://github.com/MailiTruong/TransConnect.git",
                "Elaboration of generic librery for GUI, Clients module, Employee module, Orders module, statistics module"),
];



