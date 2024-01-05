import App from "./app";

const app = new App();
/*
import MapEditor from "./editor/mapeditor";

const app = new MapEditor();
*/

window.addEventListener('DOMContentLoaded', async () => {
    await app.init();
    app.render();
});