import sendRequest from "./sendRequest";

// const baseUrl = `https://gateway-staging.ncrcloud.com/emerald/selling-service/cart/v1/carts`;
// const baseUrl = `https://localhost:443/carts`;
// const baseUrl = `http://localhost:8080/carts`;
const baseUrl = "https://gokart.retail.ncrcloud.com/carts";

export async function createCart(siteId) {
    await sendRequest(
        `https://gokart.retail.ncrcloud.com/warmup`,
        "POST",
        {},
        siteId,
        true
    );
    return await sendRequest(`${baseUrl}`, "POST", {}, siteId, true);
}

export async function deleteCart(siteId, cartId) {
    return await sendRequest(
        `${baseUrl}/${cartId}/items`,
        "DELETE",
        null,
        siteId
    );
}

export async function getCartById(siteId, cartId) {
    return await sendRequest(`${baseUrl}/${cartId}`, "GET", null, siteId);
}

export async function getCartItemsById(siteId, cartId) {
    return await sendRequest(`${baseUrl}/${cartId}/items`, "GET", null, siteId);
}

export async function addItemToCart(siteId, cartId, etag, item) {
    console.time();
    item.quantity.value = item.quantity.value.toString();
    console.log(item);
    let cart = await sendRequest(
        `${baseUrl}/${cartId}/items`,
        "POST",
        item,
        siteId
    );
    console.timeEnd();
    return cart;
}

export async function updateItemInCartById(siteId, cartId, etag, lineId, item) {
    console.log(item);
    item.quantity.value = item.quantity.value.toString();
    let cart = await sendRequest(
        `${baseUrl}/${cartId}/items/${lineId}`,
        "PATCH",
        item,
        siteId
    );
    return cart;
}

export async function removeItemInCartById(siteId, cartId, lineId) {
    let cart = await sendRequest(
        `${baseUrl}/${cartId}/items/${lineId}`,
        "DELETE",
        { voidReason: "removed" },
        siteId
    );
    return cart;
}

export async function updateUserCartStatus(siteId, cartId, status) {
    let cart = await sendRequest(
        `${baseUrl}/${cartId}`,
        "PATCH",
        { status },
        siteId
    );
    return cart;
}
