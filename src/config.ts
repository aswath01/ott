import dotenv from 'dotenv';

dotenv.config({});

class Config{
    public DATABASE_URL : String | undefined;
    public JWT_TOKEN : String | undefined;
    public NODE_ENV : String | undefined;
    public SECRET_KEY_ONE : String | undefined;
    public SECRET_KEY_TWO : String | undefined;
    public CLIENT_URL : String | undefined;

    private readonly DEFAULT_DATABASE_URL = "mongodb+srv://aswath:qwertyup@cluster0.k6p1o.mongodb.net/test";
    constructor(){
        this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
        this.JWT_TOKEN = process.env.JWT_TOKEN || '';
        this.NODE_ENV = process.env.NODE_ENV || '';
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
    }
    public validatorConfig() : void{
        for(const [key,value] of Object.entries(this)){
            if(value === undefined){
                throw new Error(`The values aren't properly retrived for ${key}`);
            }
        }
    }
}

export const configFile : Config = new Config();
