<template>
    <div>
        {{getData}}
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data: function(){
            return {
                getData: ""
            }
        },
        mounted: function(){
            axios.post("test").then( (res)=>{
                console.log(res);
                this.getData = res.data;
            } )
        }
    }
</script>
<style>

</style>