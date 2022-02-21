import { sha256 } from 'js-sha256';

export const mySha256 = (input: string) => {
    const hash = sha256.create();
    hash.update(input);
    return hash.hex();
}