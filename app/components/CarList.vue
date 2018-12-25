<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Games" horizontalAlignment="left"/>
      <ActionItem ios.position="right" android.position="right">
          <Switch :checked="isConnected" />
      </ActionItem>
    </ActionBar>

    <RadListView v-if="!isLoading" for="item in carList" @itemTap="onItemTap" class="list-group">
      <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical"/>
      <v-template>
        <GridLayout rows="*, *, *" columns="*, *" class="list-group-item-content">
          <Label :text="item.name" class="text-primary list-group-item-text font-weight-bold"/>
          <Label col="1" horizontalAlignment="right" class="list-group-item-text m-r-5">
            <FormattedString>
              <Span text.decode="&euro;"/>
              <Span :text="item.price"/>
              <Span text="/day"/>
            </FormattedString>
          </Label>
          <Label row="1" class="hr-light m-t-5 m-b-5" colspan="2"/>

          <Image
            row="2"
            :src="item.imageUrl"
            stretch="aspectFill"
            height="120"
            class="m-r-20"
            loadMode="async"
          />

          <StackLayout row="2" col="1" verticalAlignment="center" class="list-group-item-text">
            <Label class="p-b-10">
              <FormattedString ios.fontFamily="system">
                <Span text.decode="&#xf1b9;   " class="fa text-primary"></Span>
                <Span :text="item.class"/>
              </FormattedString>
            </Label>
            <Label class="p-b-10">
              <FormattedString ios.fontFamily="system">
                <Span text.decode="&#xf085;   " class="fa text-primary"/>
                <Span :text="item.transmission"/>
                <Span text=" Transmission"/>
              </FormattedString>
            </Label>
            <Label class="p-b-10">
              <FormattedString ios.fontFamily="system">
                <Span text.decode="&#xf2dc;   " class="fa text-primary"/>
                <Span :text="item.hasAC ? 'Yes' : 'No'"/>
              </FormattedString>
            </Label>
          </StackLayout>
        </GridLayout>
      </v-template>
    </RadListView>
    <ActivityIndicator v-else :busy="isLoading"/>
  </Page>
</template>

<script>
import * as dialogs from "tns-core-modules/ui/dialogs";
import CarDetails from "./CarDetails";
import { connectionType, startMonitoring } from "tns-core-modules/connectivity";
import { DBConnection } from '../services/db/DBConnection';

export default {
  data: {
    isConnected: false
  },
  created() {
    startMonitoring(newConnectionType => {
      switch (newConnectionType) {
        case connectionType.none:
          this.isConnected = false;
          dialogs.alert("Connection type changed to none.").then({});
          break;
        case connectionType.wifi:
          const db = new DBConnection();
          console.log(db);
    
          this.isConnected = true;
          dialogs.alert("Connection type changed to WiFi.").then({});
          //dialogs.alert(db.fetch()).then({});
          break;
        case connectionType.mobile:
          this.isConnected = true;
          dialogs.alert("Connection type changed to mobile.").then({});
          break;
        default:
          dialogs.alert("No coincidence").then({});
          break;
      }
    });
  },
  computed: {
    carList() {
      return this.$root.cars;
    },

    isLoading() {
      return !this.carList.length;
    }
  },

  methods: {
    onItemTap(e) {
      this.$emit("select", e.item);
      this.$navigateTo(CarDetails, { props: { car: e.item } });
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../app-variables";
// End custom common variables
</style>
