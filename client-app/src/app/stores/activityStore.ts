import { makeAutoObservable, runInAction} from "mobx";
import agent from "../API/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort( (a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActitivites = async () => {
        this.setLoadingInitial(true);
        try{
            const activities = await agent.Activities.list();
            activities.forEach((el: Activity) => {
                el.date = el.date.split('T')[0];
                this.activityRegistry.set(el.id, el);
            });
            this.setLoadingInitial(false);
        } catch(error) {
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?:string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        const active = activity;
        this.loading = true;
        active.id = uuid();
        try{
            await agent.Activities.create(active);
            runInAction( () => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (er) {
            console.log(er);
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try { 
            await agent.Activities.update(activity);
            runInAction( () => {
                this.activityRegistry.set(activity.id, activity);
                this.loading = false;
                this.selectedActivity = activity;
                this.editMode = false;
            })
        } catch( er ){
            console.log(er);
            this.loading = false;
        }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (er) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}