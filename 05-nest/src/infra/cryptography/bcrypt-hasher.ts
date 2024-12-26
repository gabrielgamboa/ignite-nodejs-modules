import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hash-generator";
import { compare, hash } from "bcryptjs";

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  async hash(plainText: string): Promise<string> {
    return hash(plainText, this.HASH_SALT_LENGTH);
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return compare(plainText, hash);
  }
}