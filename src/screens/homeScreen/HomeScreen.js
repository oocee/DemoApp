import React, {useState, useEffect} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite'

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

function Items({ onPressItem }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from items;`,
        [],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);


  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      {items.map(({ id, value }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem(id)}
          style={{
            borderRadius: 10,
            padding: 8,
            margin: 5,
            backgroundColor: "#86c1cc47",
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 3,
          }}
        >
          <Text style={{ color: "black"}}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const HomeScreen = () => {

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);"
      );
    });
  }, []);

  const add = () => {
    //This function adds task to database.
    if (task === null || task === "") {
      console.log("false")
      return false;
    }

    db.transaction(
      (tx) => {
       tx.executeSql("insert into items (done, value) values (0, ?)", [task]);
        console.log(task)
        tx.executeSql("select * from items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
    setTask(null)
    };
  
  const DeleteAll = () => {
    // This function deletes all tasks from database.
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM ITEMS');
      },
      null,
      forceUpdate
    )
  };

  
  const [task, setTask] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  return (
    //This checks if user is using browser and shows text "You can't use this app on browser", because SQLite database does not work with browser.
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.heading}>
            You can't use this app on browser
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.addTask}>
            <Text style={styles.textstyle}>Add New Task</Text>
            <CustomInput 
              value={task}
              setValue={setTask}
              placeholder={'Add task'}
              style={styles.input}
            />
            <CustomButton
              onPress={add}
              text='add'
              type='blue'
            />
            <CustomButton 
              onPress={DeleteAll}
              text='DELETE ALL'
              type= 'blue'
            />
            <Text style={styles.textstyle}>
              TASK LIST
            </Text>
          </View>
            <ScrollView style={styles.listArea}>
              <Items
                key={`forceupdate-todo-${forceUpdateId}`}
                  onPressItem={(id) =>
                    db.transaction(
                      (tx) => {
                      tx.executeSql(`delete from items where id = ?;`, [id]);
                      },
                    null,
                    forceUpdate
                  )
                }
              />
          </ScrollView>

        </>
      )}
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#86c1cc",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  taskArea: {
    backgroundColor: "fff4f4",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  addTask: {
    flexDirection: "column",
    alignItems: "center",
  },
  textstyle: {
    fontWeight: "bold",
    fontSize: 30,
    margin: 5,
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    marginHorizontal: 20,
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff4f463",
    borderRadius: 20,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
})

export default HomeScreen