import pb from "../utils/pb"

type AccountType = {
    id: string,
    fullName: string,
    address: string,
    phone: string,
    email: string,
}

function getProfile(userId: string): Promise<AccountType> {
    return pb.collection('user_profile').getFirstListItem(`user='${userId}'`)
}

function createProfile(userId: string) {
    return pb.collection('user_profile').create({ user: userId })
}

function updateProfile({ profileId, data }: { userId: string, data: AccountType }) {
    return pb.collection('user_profile').update(profileId, data)
}

export type {
    AccountType
}

export const accountApi = {
    getProfile,
    createProfile,
    updateProfile
}