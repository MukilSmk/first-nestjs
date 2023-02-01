import * as bcrypt from 'bcrypt';

export const hash_password = async (password: string)=>{
    const hash = await bcrypt.hash(password, 10);
    return hash
}
