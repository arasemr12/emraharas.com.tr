export default defineEventHandler((event) => {
    let ip = event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress || "";
    return {ip};
});
