import React, { useRef } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';
import { saveProjectInfo } from '../../utils/supabase';
import { Area, Objective, Resource } from '../../enums/projectEnums';
import { COLORS } from '../../constants/colors';
import SPACING from '../../constants/spacing';
import {
  getUserIdFromLocalStorage,
  storeDataLocally
} from '../../utils/asyncStore';

const windowWidth = Dimensions.get('window').width;
export interface IProject {
  idea: string;
  name: string;
}

export default function CreateProject() {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();
  const handleSaveData = async (projectData: IProject) => {
    const { data: userid, error: useridErr } =
      await getUserIdFromLocalStorage();
    if (useridErr) return console.error(useridErr);

    if (!userid) return console.error('Ha ocurrido un error con el usuario');

    const dataToSend = {
      project_description: projectData.idea,
      project_name: projectData.name,
      ...projectData,
      user_id: userid
    };
    delete dataToSend.name;
    delete dataToSend.idea;

    const { error, data } = await saveProjectInfo(dataToSend);
    if (error) console.error(error);

    await storeDataLocally({
      key: 'project',
      value: JSON.stringify(data)
    });
    setIsSucessForm(true);
    setTimeout(() => {
      navigate('Roadmap', data);
    }, 1500);
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = (projectData: IProject) => {
    handleSaveData(projectData);
  };

  const onError: SubmitErrorHandler<IProject> = (errors, e) => {
    return console.error(errors);
  };

  const scrollViewRef = useRef();
  const [isSucessForm, setIsSucessForm] = React.useState(false);

  if (isSucessForm)
    return (
      <View style={styles.confirmationContainer}>
        <Ionicons name="checkmark-circle" size={24} color="black" />
        <Text>Proyecto creado</Text>
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          if (!scrollViewRef.current) return;
          (scrollViewRef.current as any).scrollToEnd({ animated: true });
        }}
      >
        <Text>Cuéntanos tu idea</Text>
        <Controller
          control={control}
          name="idea"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputTextArea}
                onBlur={onBlur}
                placeholder="Voy a crear ..."
                value={value}
                onChangeText={onChange}
                multiline={true}
                numberOfLines={4}
              />
              {errors.idea && (
                <Text style={styles.errorText}>{error.message}</Text>
              )}
            </View>
          )}
          rules={{
            required: 'Ingresa tu idea'
          }}
        />

        <Text>Dale un nombre</Text>
        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputTextArea}
                onBlur={onBlur}
                placeholder="Nombre"
                value={value}
                onChangeText={onChange}
              />
              {errors.name && (
                <Text style={styles.errorText}>{error.message}</Text>
              )}
            </View>
          )}
          rules={{
            required: 'Ingresa el nombre de tu idea'
          }}
        />

        <Pressable
          style={styles.btn}
          onPress={handleSubmit(onSubmit, onError)}
          accessibilityLabel="Create new project button"
        >
          <Text style={styles.btnText}>
            {isSubmitting ? <ActivityIndicator /> : 'Empezar'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const formGlobalStyles = formStyles;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screenContainer,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: SPACING.large,
    flex: 0
  },

  title: {
    ...globalStyles.title,
    marginBottom: 40
  },

  inputContainer: {
    marginBottom: 24,
    minHeight: 48
  },

  input: {
    ...formGlobalStyles.input,
    width: windowWidth - 40
  },

  inputTextArea: {
    ...formGlobalStyles.input,
    width: windowWidth - 40,
    height: 48,
    textAlignVertical: 'top'
  },

  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 2
  },

  btn: {
    ...formGlobalStyles.btnPrimary,
    width: windowWidth - 40,
    marginTop: 24
  },

  btnText: {
    ...formGlobalStyles.btnPrimaryText
  },

  confirmationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: COLORS.primaryWhite
  }
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    width: windowWidth - 40,
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30
  }
});
