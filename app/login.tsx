import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/constants/Typography';
import UsernameIcon from '@/assets/icons/Username.svg';
import PasswordIcon from '@/assets/icons/Password.svg';
import GoogleIcon from '@/assets/icons/Google.svg';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'test' && password === 'test') {
      setError('');
      router.replace('/home'); // Navigate to home screen
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/soulgood-light.png')} style={styles.logo} />
      <Text style={styles.welcome}>
        Welcome to <Text style={styles.highlight}>SoulGood</Text>!
      </Text>

      <View style={styles.inputContainer}>
        <UsernameIcon width={24} height={24} style={styles.icon} />
        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="#B5B5B5"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <PasswordIcon width={24} height={24} style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#B5B5B5"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

  {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.forgotPasswordContainer}>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
    </View>

      <Text style={styles.orText}>or sign in with</Text>

      <TouchableOpacity style={styles.googleButton}>    
        <View style={styles.googleContainer}>  
          <GoogleIcon width={24} height={24} style={styles.googleicon} />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Do not have an account?{"   "}
        <Text style={styles.signupLink} onPress={() => router.push('/signup')}>
          Sign up here!
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F7F0',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  welcome: {
    fontSize: Typography.fontSize.largest,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 20,
  },
  highlight: {
    color: '#FFAE00', // Orange color for 'SoulGood'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 30,
    marginBottom:20,
    width: '90%', 
    height:60,
  },
  icon: {
    marginLeft:20,
    marginRight:20,
  },
  input: {
    // flex: 1,
    width: '90%',
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor:'#EDEDED',
    fontSize: Typography.fontSize.small,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    width: '90%',
    height: 60,
    backgroundColor: '#FFAE00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
  loginText: {
    color: '#FFF',
    fontSize: Typography.fontSize.large,
    fontWeight: '700',
  },
  forgotPasswordContainer: {
    width: '90%',
    alignItems: 'flex-end', 
    marginBottom: 20, 
  },
  forgotPassword: {
    color: '#8D8D8D',
    fontSize: Typography.fontSize.tiny,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  orText: {
    fontSize: Typography.fontSize.tiny,
    fontWeight: '500',
    color: '#8D8D8D',
    marginVertical: 10,
  },
  googleicon: {
    marginRight:15,
  },
  googleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleButton: {
    width: '90%',
    height: 60,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
  },
  googleText: {
    color: '#585858',
    fontSize: Typography.fontSize.large,
    fontWeight: '700',
  },
  signupText: {
    fontSize: Typography.fontSize.small,
    fontWeight: '500',
    color: '#333333',
  },
  signupLink: {
    color: '#FFAE00',
    textDecorationLine: 'underline',

  },
});
