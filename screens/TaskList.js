import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Colours from '../constants/Colours';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import ToDoItem from '../components/ToDoItem';

const TaskList = ({ navigation }) => {
  const [toDoItems, setToDoItems] = useState([
    {text: 'hello', isChecked: false}])

    const RenderAddListIcon = ({addItemToLists}) => {
      return (
       
        <View  style={styles.container}>
        
        <FAB 
        key={toDoItems.id}
        style={styles.fab}
        large
        icon="plus"
        onPress={() => addItemToLists({text: '',
         isChecked: false, isNewItem: true})}
      />
        
        </View>
        
      )
    }
    

    const addItemToLists = (item) => {
      toDoItems.push(item);
      setToDoItems([...toDoItems]);
    }
    const removeItemFromLists = (index) => {
      toDoItems.splice(index,1);
      setToDoItems([...toDoItems])
    }

    const updateItem = (index, item) => {
      toDoItems[index] = item;
      setToDoItems([...toDoItems])
    }
  
  return (
        <View style={styles.container}> 
          <FlatList
          data={toDoItems}
          renderItem={({item: {text, isChecked, isNewItem},index}) => {
            return <ToDoItem
             text={text} 
             isChecked={isChecked}
             isNewItem={isNewItem} 
             onChecked={() => {
              const toDoItem = toDoItems[index];
              toDoItem.isChecked = !isChecked;
              updateItem(index, toDoItem)
            }}
            onChangeText={(newText) => {
              const toDoItem = toDoItems[index];
              toDoItem.text = newText;
              updateItem(index, toDoItem);
            }}
            onDelete={() => {
              removeItemFromLists(index)
            }}
            />
            
          }}
          
          />
         <RenderAddListIcon addItemToLists={addItemToLists}/>
        </View>
        
    );
}
export default TaskList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
     
    },
    icon: {
      padding: 5,
      fontSize: 24
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      color: Colours.red
    },
});