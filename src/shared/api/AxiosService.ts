import axios from "axios";
import { TrainingLanguages } from "../types/TrainingLanguages";

const baseUrl = "https://6447c33150c25337442e3750.mockapi.io"

export class AxiosService {
    public static async getByLanguage(language: TrainingLanguages){
        let res;
        axios.all([
            axios.get(baseUrl + "/keyboards?language="+language),
            axios.get(baseUrl + "/words?language="+language)
        ]).then(axios.spread((data1, data2) => {
            res = {
                keyboard: data1.data,
                text: data2.data
            }
        }))
        console.log(res)
        return res;
    }
}