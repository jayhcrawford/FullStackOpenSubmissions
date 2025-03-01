import { AuthenticationError } from 'apollo-server';

import { ACCESS_TOKEN_EXPIRATION_TIME } from '../config';
import signJwt from './signJwt';
import verifyJwt from './verifyJwt';

const subject = 'accessToken';

class AuthService {
  constructor({ accessToken, dataLoaders }) {
    this.accessToken = accessToken;
    this.dataLoaders = dataLoaders;
  }

  async getUserId() {
    if (!this.accessToken) {
      return null;
    }

    let tokenPayload;

    try {
      tokenPayload = verifyJwt(this.accessToken, { subject });
    } catch (e) {
      return null;
    }

    console.log(tokenPayload, "is the token payload")

    return tokenPayload.userId;
  }

  async getUser() {
    const id = await this.getUserId();

    if (!id) {
      return null;
    }

    console.log("the id is: ", id)

    return this.dataLoaders.userLoader.load(id);
  }

  async getUserOrFail(error) {
    const normalizedError =
      error || new AuthenticationError('Authorization is required');

    const user = await this.getUser();

    if (!user) {
      throw normalizedError;
    }

    return user;
  }

  createAccessToken(userId) {
    const expiresAt = new Date(Date.now() + ACCESS_TOKEN_EXPIRATION_TIME);

    return {
      accessToken: signJwt(
        { userId },
        {
          expiresIn: expiresAt - new Date(),
          subject,
        },
      ),
      expiresAt,
    };
  }
}

export default AuthService;
