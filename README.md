Prerequisites:
- Homebrew
- npm & node

# Setting up
1. Clone this repo

<ins> To launch iOS emulator: </ins>
2. Download and open xcode on your computer (this should be in app store on Mac)
3. Run `sudo xcodebuild -license accept` to accept the Xcode license
4. Navigate to Xcode (top left hand corner) > settings > components > macOS > download iOS 18.4 simulator
5. Confirm that you have installed iOS emulators with `xcrun simctl list devices` and boot any of the simulators manually with `xcrun simctl boot "iPhone 16 Pro"` and open it with `open -a Simulator` (you can also do this step with the GUI)
6. Run `npm run: ios` in VSCode terminal

<ins> To launch Android emulator: </ins>
2. Download [android studio](https://developer.android.com/studio) and go through setup, making sure to accept licenses
3. Add the following to your `.zshrc` file:

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

This is because Xcode tools auto-install to known macOS locations, while Android needs manual path setup because its SDK can be installed anywhere.
4. Create an android virtual device: Open Android studio, click 'More Actions' > 'Virtual Device Manager' > Click on the play button next to a device
5. Confirm installation with `adb devices`, you should see your emulator listed if its running
6. Make sure you refresh your .zshrc file (with `source ~/.zshrc`), then run `npm run: android` in your VSCode terminal. 

An issue you may run into:
`[CXX1101] NDK at /Users/rebecca/Library/Android/sdk/ndk/27.1.12297006 did not have a source.properties file`
Open Android Studio > Search for SDK Tools > Check 'Show Package Details' in the bottom right, find the version specified (in my case 27.1.12297006) and apply it to install
Try `npm run: android` again

Note: Running step 6 (building the project) will take a while for both iOS and android, this is normal.

^^ Let me know if you run into issues following the above instructions, I'll help troubleshoot 

-------------------------------------------------------------------------------------------

# Welcome to your new ignited app!

> The latest and greatest boilerplate for Infinite Red opinions

This is the boilerplate that [Infinite Red](https://infinite.red) uses as a way to test bleeding-edge changes to our React Native stack.

- [Quick start documentation](https://github.com/infinitered/ignite/blob/master/docs/boilerplate/Boilerplate.md)
- [Full documentation](https://github.com/infinitered/ignite/blob/master/docs/README.md)

## Getting Started

```bash
npm install
npm run start
```

To make things work on your local simulator, or on your phone, you need first to [run `eas build`](https://github.com/infinitered/ignite/blob/master/docs/expo/EAS.md). We have many shortcuts on `package.json` to make it easier:

```bash
npm run build:ios:sim # build for ios simulator
npm run build:ios:dev # build for ios device
npm run build:ios:prod # build for ios device
```

### `./assets` directory

This directory is designed to organize and store various assets, making it easy for you to manage and use them in your application. The assets are further categorized into subdirectories, including `icons` and `images`:

```tree
assets
├── icons
└── images
```

**icons**
This is where your icon assets will live. These icons can be used for buttons, navigation elements, or any other UI components. The recommended format for icons is PNG, but other formats can be used as well.

Ignite comes with a built-in `Icon` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/boilerplate/app/components/Icon.md).

**images**
This is where your images will live, such as background images, logos, or any other graphics. You can use various formats such as PNG, JPEG, or GIF for your images.

Another valuable built-in component within Ignite is the `AutoImage` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/Components-AutoImage.md).

How to use your `icon` or `image` assets:

```typescript
import { Image } from 'react-native';

const MyComponent = () => {
  return (
    <Image source={require('assets/images/my_image.png')} />
  );
};
```

## Running Maestro end-to-end tests

Follow our [Maestro Setup](https://ignitecookbook.com/docs/recipes/MaestroSetup) recipe.

## Next Steps

### Ignite Cookbook

[Ignite Cookbook](https://ignitecookbook.com/) is an easy way for developers to browse and share code snippets (or “recipes”) that actually work.

### Upgrade Ignite boilerplate

Read our [Upgrade Guide](https://ignitecookbook.com/docs/recipes/UpdatingIgnite) to learn how to upgrade your Ignite project.

## Community

⭐️ Help us out by [starring on GitHub](https://github.com/infinitered/ignite), filing bug reports in [issues](https://github.com/infinitered/ignite/issues) or [ask questions](https://github.com/infinitered/ignite/discussions).

💬 Join us on [Slack](https://join.slack.com/t/infiniteredcommunity/shared_invite/zt-1f137np4h-zPTq_CbaRFUOR_glUFs2UA) to discuss.

📰 Make our Editor-in-chief happy by [reading the React Native Newsletter](https://reactnativenewsletter.com/).
