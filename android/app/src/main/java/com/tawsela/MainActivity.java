package com.tawsela;

import android.os.Bundle; // here

import org.devio.rn.splashscreen.SplashScreen;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {

  @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
}
