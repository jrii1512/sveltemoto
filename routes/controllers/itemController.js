
import * as itemServices from "../../services/itemService.js";
import { renderFile } from "../../deps.js";



const showMain = async ({ response }) => {
    response.body = await renderFile('../views/start.eta');    
};


const addIdea = async({request, response}) => {
    console.log("Idean lisäys");
    const body = request.body();    
    const formData = await body.value;
    const idea = formData.get("toive").trim();
    const esittaja = formData.get("esittaja").trim();
    var ideaStatus = Boolean(true);
    var orderStatus = Boolean(false);
    var deliveredStatus = Boolean(false);
    console.log('itemController -> ' + idea + ", " + esittaja + ",ideaStatus-> " + ideaStatus, " ,orderStatus->" + orderStatus + ", deliveredStatus->" + deliveredStatus);
    await itemServices.addIdea(idea, esittaja, ideaStatus, orderStatus, deliveredStatus);
    response.redirect('/ideas');
};

const getIdeas = async({response}) => {
    response.body = await renderFile("../views/ideas.eta", {
        ideas: await itemServices.fetchIdeas(),
    });
};

const getOrders = async({params, response}) => {        
    console.log("itemController, getOrders -> params.id = " + params.id);
    response.body = await renderFile("../views/orders.eta", {
        ordered: await itemServices.fetchOrders(params.id),
    });
};

const getDelivered = async({params, response}) => {    
        console.log("itemController, getDelivered -> params.id = " + params.id);
        response.body = await renderFile("../views/delivered.eta",{
        deliveries: await itemServices.fetchDelivered(params.id),
        });            
};

const doDelete = async (response) => {
    console.log("itemController, doDelete");
    await itemServices.deleteAll();
    console.log("All data erased");
    response.body = await renderFile('index.eta', {
        status: "Data tuhottu",
    });
}

export {showMain, getIdeas, getOrders, getDelivered, addIdea, doDelete};