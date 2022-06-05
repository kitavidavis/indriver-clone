package com.flux;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import android.content.Intent;
import com.tkporter.sendsms.SendSMSPackage;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    //probably some other stuff here
    SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
}

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "flux";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
   SplashScreen.show(this);  
      super.onCreate(savedInstanceState);
}

}
