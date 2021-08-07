import type { HashContract } from '@ioc:Adonis/Core/Hash';
import type { UserProviderContract, ProviderUserContract } from '@ioc:Adonis/Addons/Auth';
import neo4j from 'neo4j-driver';
import neo4jDriver from '@ioc:Adonis/Addons/Neo4j';

/**
 * Shape of the user object returned by the "Neo4JAuthProvider"
 * class. Feel free to change the properties as you want
 */
export type User = {
  uuid: string;
  username: string;
  email: string;
  password: string;
  rememberMeToken: string | null;
};

/**
 * The shape of configuration accepted by the Neo4JAuthProvider.
 * At a bare minimum, it needs a driver property
 */
export type Neo4JAuthProviderConfig = {
  driver: 'neo4j';
};

/**
 * Provider user works as a bridge between your User provider and
 * the AdonisJS auth module.
 */
class ProviderUser implements ProviderUserContract<User> {
  constructor(public user: User | null, private hash: HashContract) {}

  public getId() {
    return this.user ? this.user.uuid : null;
  }

  public getRememberMeToken() {
    return this.user ? this.user.rememberMeToken : null;
  }

  public setRememberMeToken(token: string) {
    if (!this.user) {
      return;
    }
    this.user.rememberMeToken = token;
  }

  public async verifyPassword(plainPassword: string) {
    if (!this.user) {
      throw new Error('Cannot verify password for non-existing user');
    }
    
    return this.hash.verify(this.user.password, plainPassword);
  }
}

/**
 * The User provider implementation to lookup a user for different
 * operations
 */
export class Neo4JAuthProvider implements UserProviderContract<User> {
  constructor(public config: Neo4JAuthProviderConfig, private hash: HashContract) {}

  public async getUserFor(user: User | null) {
    return new ProviderUser(user, this.hash);
  }

  public async updateRememberMeToken(user: ProviderUser) {
    let session = neo4jDriver.session();
    await session
      .writeTransaction((txc) => {
        return txc.run('MATCH (p:Player{uuid: $uuid}) SET p.rememberMe = $rememberMe', {
          uuid: user.getId(),
          rememberMe: user.getRememberMeToken(),
        });
      })
      .then(() => session.close());
    // TODO: Add transaction validation check
    console.log('[Neo4jAuth] updateRememberMeToken');
  }

  public async findById(id: string | number) {
    let user;
    let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
    await session
      .readTransaction((txc) => {
        return txc.run('MATCH (p:Player {uuid: $uuid}) RETURN p', { uuid: id });
      })
      .then((result) => {
        if (result.records.length !== 0) {
          user = result.records[0].get(0).properties as User;
        }
      })
      .then(() => session.close());
    console.log('[Neo4jAuth] findById');
    return this.getUserFor(user || null);
  }

  public async findByUid(uidValue: string) {
    let user;
    let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
    await session
      .readTransaction((txc) => {
        return txc.run('MATCH (p:Player {email: $uid}) RETURN p', { uid: uidValue });
      })
      .then((result) => {
        if (result.records.length !== 0) {
          user = result.records[0].get(0).properties as User;
        }
      })
      .then(() => session.close());
    console.log('[Neo4jAuth] findByUid');
    return this.getUserFor(user || null);
  }

  public async findByRememberMeToken(userId: string | number, token: string) {
    let user;
    let session = neo4jDriver.session({ defaultAccessMode: neo4j.session.READ });
    await session
      .readTransaction((txc) => {
        return txc.run('MATCH (p:Player {rememberMe: $remember, uuid: $uuid}) RETURN p', {
          uuid: userId,
          rememberMe: token,
        });
      })
      .then((result) => {
        if (result.records.length !== 0) {
          user = result.records[0].get(0).properties as User;
        }
      })
      .then(() => session.close());
    console.log('[Neo4jAuth] findByRememberMeToken');
    return this.getUserFor(user || null);
  }
}
