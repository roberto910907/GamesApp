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
import CarDetails from "./../CarDetails";
import { connectionType, startMonitoring } from "tns-core-modules/connectivity";
import { mapGetters, mapActions } from 'vuex';
import { isBoolean } from 'util';

export default {
  created() {
    startMonitoring(newConnectionType => {
      switch (newConnectionType) {
        case connectionType.none:
          this.updateConnectionStatus(false);
          break;
        case connectionType.wifi:
         if(!this.isConnected){
          dialogs.confirm("Ya tienes conexión WIFI. Deseas sincronizar la aplicación?").then(result => {
            if(result === true) {
              this.updateConnectionStatus(true);
            }
          });
         }
          break;
        case connectionType.mobile:
          if(!this.isConnected){
            dialogs.confirm("Ya tienes conexión por Datos. Deseas sincronizar la aplicación?").then(result => {
              if(result === true) {
                this.updateConnectionStatus(true);
              }
            });
          }
          break;
        default:
          dialogs.alert("No identificamos ninguna conexión.").then({});
          break;
      }
    });
  },
  computed: {
    ...mapGetters({
      isConnected: 'GameList/getConnectionStatus'
    }),

    carList() {
      return this.$root.cars;
    },

    isLoading() {
      return !this.carList.length;
    }
  },

  methods: {
    ...mapActions({
      updateConnectionStatus: 'GameList/updateConnectionStatus'
    }),
    onItemTap(e) {
      this.$emit("select", e.item);
      this.$navigateTo(CarDetails, { props: { car: e.item } });
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../../styles/app.scss";
</style>
