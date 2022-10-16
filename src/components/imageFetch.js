import axios from "axios";

export async function imageFetch(query, page = 1) {
    const UrlBase = 'https://pixabay.com/api/';
    const ApiKey = '29417060-6945200ead3992d525ee3c3b8';
    const otherParameters = `image_type=photo&orientation=horizontal&per_page=12`;

    return await axios.get(
        `${UrlBase}?q=${query}&page=${page}&key=${ApiKey}&${otherParameters}`
    )

}
