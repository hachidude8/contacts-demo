import { EmbeddedLink } from './response';
import { Contact } from './modules/contact';


export interface Entity {
  /**
   * Base64 encoded reference to _links.self.href
   * Makes checking for an ID easier since the API does not provide one.
   */
  uuid?: string;
  _links?: EmbeddedLink;
}


export const setUUID = (data: Contact) => {
  data.uuid = generateUUID(data);
};

export const generateUUID = (data: Contact): string | undefined => {
  let uuid: string | undefined;
  if (data._links?.self.href) {
    uuid = btoa(data._links.self.href);
  }
  return uuid;
};

export const decodeUUID = (uuid: string): string => {
  if (!uuid) {
    return '';
  }
  return atob(uuid);
};
