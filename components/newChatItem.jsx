import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { images } from '../constants';
import { formatDate, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import proPics from '../constants/proPic';


const NewChatItem = ({ item, router, noBorder, currentUser }) => {
    const [lastMessage, setLastMessage] = useState(undefined);

    useEffect(() => {
        const roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        const unsub = onSnapshot(q, (snapshot) => {
            const allMessages = snapshot.docs.map((doc) => doc.data());
            setLastMessage(allMessages[0] ? allMessages[0] : null);
        });

        return unsub;
    }, []);

    const openChatRoom = () => {
        router.push({ pathname: 'pages/InboxChat', params: item });
    };

    const renderTime = () => {
        if (lastMessage) {
            const date = new Date(lastMessage?.createdAt?.seconds * 1000);
            return formatDate(date);
        }
        return '';
    };

    const renderLastMessage = () => {
        if (typeof lastMessage === 'undefined') return 'Loading...';
        if (lastMessage) {
            if (currentUser?.userId === lastMessage?.userId) return "You: " + lastMessage?.text;
            return lastMessage?.text;
        }
        return 'Say Hi!!!';
    };

    const proPic = proPics[Math.floor(Math.random() * proPics.length)];
    return (
        <TouchableOpacity
            className={`pt-4 pb-4 flex-row items-center ${noBorder ? "" : 'border-b-2 border-secondary'}`}
            onPress={openChatRoom}
        >
            <Image
                source={proPic}
                resizeMode="contain"
                className="w-[50px] h-[50px] ml-2 rounded-full"
            />
            <View className="flex-1 flex-col ml-2">
                <Text className="text-lg text-t_primary font-psemibold">
                    {item?.username}
                </Text>
                <Text className="text-sm text-t_primary ml-2">
                    {renderLastMessage()}
                </Text>
            </View>
            <View className="ml-auto pr-2">
                <Text className="text-sm text-t_primary">
                    {renderTime()}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


export default newChatItem