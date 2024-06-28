import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.donatien.aora',
    projectId: '667c2654002e7b5c2f41',
    databaseId: '667c29d7003794e248fd',
    userCollectionId: '667c2a0e0018d480a607',
    videoCollectionId: '667c2a4400373f4cca47',
    storageId: '667c311700336bf2f018',
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId)
    .setPlatform(config.platform)
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            username
        );

        if (!newAccount) throw new Error('Account creation failed');
        
        const avatarUrl = avatars.getInitials(username);

        await databases.createDocument(
            config.databaseId,
            config.userCollectionId, 
            ID.unique(), 
            {
                accountId: newAccount.$id, 
                email, 
                username, 
                password, 
                avatar: avatarUrl, 
            }
        );

        await signIn(email, password);

        return await account.get()

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }  
};


export const signIn = async (email, password) => {
    try {
        await account.createEmailPasswordSession(email, password)

        return await account.get()

    } catch (error) {
        throw new Error(error.message);
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error('No current account');

        const currentUser = await databases.listDocuments(
            config.databaseId, 
            config.userCollectionId, 
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser.documents.length) throw new Error('No current user');

        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getAllPosts = async () => {
    
    try {
        const posts = await databases.listDocuments(
            config.databaseId, 
            config.videoCollectionId
        )

        return posts.documents

    } catch (error) {
        throw Error 
    }
}


export const getLatestPosts = async () => {
    
    try {
        const posts = await databases.listDocuments(
            config.databaseId, 
            config.videoCollectionId, 
            Query.orderDesc('$createdAt', Query.limit(7))
        )

        return posts.documents
        
    } catch (error) {
        throw Error 
    }
}