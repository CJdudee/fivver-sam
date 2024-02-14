import { roleChecker } from "./roleCheck";
import { serverUser } from "./serverAuth";

export const decodeUserAndCheckAdmin = async () => {


    const sessionUser = await serverUser();

    roleChecker(sessionUser, ['admin', 'teacher']);

}
export const decodeUserAndCheckTeacher = async () => {


    const sessionUser = await serverUser();

    roleChecker(sessionUser, [ 'teacher']);

}