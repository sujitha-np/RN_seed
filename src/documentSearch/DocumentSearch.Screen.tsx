import {
  Text,
  View,
  FlatList,
  Keyboard,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import * as RNFS from 'react-native-fs';
import {useUtility} from '../hooks/useUtility';
import React, {useEffect, useState} from 'react';
import {directoryPath} from '../constants/folderPath';

const DocumentSearch = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);
  const [array, setArray] = useState<{name: string; data: string}[]>([
    {name: '', data: ''},
  ]);
  const [data, setData] = useState<string[]>([]);
  const [dummyData, setDummyData] = useState<{name: string; data: string}[]>(
    [],
  );
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const {storagePermission, showPermissionAlert} = useUtility();

  useEffect(() => {
    // NativeModules.FileList.get('txt', list => {
    //   console.warn('list', list);
    // });
    if (!value.length) {
      const createDirectory = async () => {
        try {
          const isDirectoryExists = await RNFS.exists(directoryPath);

          if (!isDirectoryExists) {
            await RNFS.mkdir(directoryPath);

            console.warn('Directory created successfully');
          } else {
            console.warn('Directory already exists');
          }
        } catch (error) {
          console.error('Error creating directory:', error);
        }
      };
      setActive(true);
      createDirectory();
    } else {
      setActive(true);
    }
  }, [value]);

  const clearSearch = () => {
    setArray([{name: '', data: ''}]);
    setData([]);
    setStartIndex(0);
    setEndIndex(10);
    setDummyData([]);
    setActive(true);
  };

  const searchFiles = async (query: string) => {
    clearSearch();
    setData([]);
    setLoading(true);
    let flag = false;
    try {
      if (query) {
        const isPermissionGranted = await storagePermission();
        if (isPermissionGranted) {
          const files = await RNFS.readDir(directoryPath);
          for (const file of files) {
            if (file.path && file.name.endsWith('.txt')) {
              const contents = await RNFS.readFile(file.path, 'utf8');
              if (
                contents.toLocaleLowerCase().includes(query.toLocaleLowerCase())
              ) {
                flag = true;
                setArray(prevFiles => [
                  ...prevFiles,
                  {name: file.name, data: contents},
                ]);

                const sentences = contents.split('.');

                setData(() => {
                  let abc = sentences.filter(sentence =>
                    sentence.toLowerCase().includes(query.toLowerCase()),
                  );

                  return abc;
                });
              } else {
              }
              setLoading(true);
            } else {
              // pdf and other doocx
            }
          }
          if (flag) {
            setDummyData(array?.slice(0, 10));
          }

          setStartIndex(10);
          setEndIndex(20);
        } else {
          showPermissionAlert();
        }
      } else {
        clearSearch();
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setActive(false);
    }
  };
  const HighlightText: React.FC<{text: string; highlight: string}> = ({
    text,
    highlight,
  }) => {
    const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text>
        {parts?.map((item: string, index: number) =>
          item.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={styles.highlight}>
              {item}
            </Text>
          ) : (
            <Text key={index}>{item}</Text>
          ),
        )}
      </Text>
    );
  };
  const renderItem = (item: any) => {
    return (
      <View style={styles.docConat}>
        <Text style={styles.docName}>{item.name}</Text>
        <View>
          <HighlightText text={data[0]} highlight={value} />
        </View>
      </View>
    );
  };
  // console.warn('hey im here', startIndex, endIndex);
  const loadMore = () => {
    setDummyData([...dummyData, ...array?.slice(startIndex, endIndex)]);
    setStartIndex(startIndex + 10);
    setEndIndex(endIndex + 10);
  };

  const EmptyListMessage = () => {
    return (
      <>
        {!active && (
          <Text style={styles.emptyText}>
            Oops! We are sorry - No results found
          </Text>
        )}
      </>
    );
  };

  return (
    <View style={styles.mainCont}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}>
        <TextInput
          value={value}
          onChangeText={text => {
            setValue(text);
            searchFiles(text);
          }}
          placeholder="Search.."
          style={styles.inputStyle}
        />
      </TouchableWithoutFeedback>
      <View style={{}}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={dummyData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => renderItem(item)}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={loading && <ActivityIndicator size={'small'} />}
          ListEmptyComponent={EmptyListMessage}
        />
      </View>
    </View>
  );
};

export default DocumentSearch;

const styles = StyleSheet.create({
  container: {},
  inputStyle: {
    width: '80%',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 80,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  docConat: {marginLeft: '10%'},
  docName: {paddingVertical: 10, color: 'black'},
  highlightedText: {
    backgroundColor: 'yellow',
  },
  highlight: {
    fontWeight: 'bold',
    color: 'red',
  },
  mainCont: {paddingBottom: 300},
  emptyText: {
    marginTop: '25%',
    textAlign: 'center',
    marginBottom: '25%',
  },
  contentContainer: {flexGrow: 1, paddingBottom: 100},
});
