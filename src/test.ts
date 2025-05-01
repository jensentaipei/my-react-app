import wretch from "wretch";

const wretcher = wretch().middlewares(
    [
        (next) => (url, options) => {
            console.log('url', url);
            return next(`https://google.com/${url}`, options);
        }
    ]
)

export default wretcher;