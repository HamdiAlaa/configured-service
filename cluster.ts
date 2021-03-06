import * as k8s from "@pulumi/kubernetes";

const kubeConfigContent:string = `
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5RENDQWJDZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRFNU1UQXdNVEV5TWpRME1sb1hEVEk1TURreU9ERXlNalEwTWxvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBUFRiCmpBZkpjTVhzL0s3MytVdHhka0s1UVdDMVBTNHJ0R2hKTExPeEo5Mm1JK2dGUSt3dzNiODgwamI1cFAyRVFGZWwKZXkxSlZvZjFzTXRWem11UWd2akVLeFpWZlNZODJXRVp1elhRRkpIbHFnRFg4M1FlYTZuQWtXaEJOeWRISjZQcQpzTkpueFd2RGFUZ1NwZ3F0TEpGSERoTkVNOVQ2ZFB5T3VCSE9xMm0rSnFpMm5IK01pNENYMXo5MUpyNVIrTWUyCkVXZWFQeVpac1ZJUXIyVXYva3h3R2t5TGo1ZEVDaGZNS0xxamRER2JndHlKRWJqZ09TcitFbVdRMzdUa2c3NGIKTzl5RklYSGFKb3F0RmZ5dWU2SjFSZ2dpYjY4akZsaGJEN2Q3ekp2NDdtaGVVeUVXWUFwbFJmeVViWlJQVko0SgpSWW94Q0hWY0VMWTNrVjhqdVI4Q0F3RUFBYU1qTUNFd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFGTWo1TTdNVWZwNVFiS1dWZlRoTU51U1ZjT28KY0ZtcDgxSmpXcDBKYlg0UFREVWpwYkhqTjBMU3ZYWjF3eEtVdUQzWndSRERuU0JjYzJmZ0xoM1VDSFNOYzJKTwpTeHRYTnZ5dXNua09McUpKVFRJSUhQWHhGOXlMaFkyT2pqNGoxdThrZ1FTM1lzaGpJT0VQaDgyK1ZxWXJkdDJPCmt3Nno3Sm4zQUFBZDhaYlpjLys3ZERITEVLSWQ0MkhCWFJtSWJTMHljUEJyR0pNeDFDUzZzVmkwN0JwaG1HK2gKcE1UR25Nck83NHpQR050QWNIRWxvSVZ6V1kwa3ZGWmljQWlycTJLemlueHVYT3pHZjhZTkoyZlA0dDZtVlA0MwpWNmVvVEwxNEs1VFNqTldldmZnSG1NZ0dGWFBiY1QzdDdMOStXMlc4Z3hLRE1ic2hxODZ2SFh3aEZnZz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
    server: https://137.135.85.61:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM4akNDQWRxZ0F3SUJBZ0lJWDZXbisvL081YVl3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB4T1RFd01ERXhNakkwTkRKYUZ3MHlNREE1TXpBeE1qSTBORFZhTURReApGekFWQmdOVkJBb1REbk41YzNSbGJUcHRZWE4wWlhKek1Sa3dGd1lEVlFRREV4QnJkV0psY201bGRHVnpMV0ZrCmJXbHVNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQWxIdFE3NmNjRjd6Z0NUYjQKZkxGRmpCQm5ZRzFkT0VOWEVoS1hDYUwvYktURjJ6SEthaXNpL2xRZFlCQm9WNXRuSEJ0dzdBVGtDOEVFbnJhRApoeFhNaGpUZ1lHRURXV1VHaXJiMlc3L1NjWENOUStZdTdDVG53d2U3Y2l6M1NxdU1kbjdwU281Vm5QM1FXRDc4CkZMR1ZvNTA5eFcvYTBYcFlmVHNxcmVkOUZpNmNrT3ZSakJOS2FBdDJjMExqWWdaUTRxcWNsREtaTkpORG9EeHcKVW5jaTRsVWoyK3F1Yjl5bTJmbndYL1lGRVRzcmdHc2s5Z1NhZ1IwTFgrYm1jWWZJcDdlTllBclQ4Y2krNDNFNQpWM0gxYUxCTXgxbEJyaUY1VDVsWTZMRHkvSk5zaVI4cmE0eXowaFZLbllFa0pmUzdRVEJYV3VROGs5dXk5ZkJICnJhRjNRd0lEQVFBQm95Y3dKVEFPQmdOVkhROEJBZjhFQkFNQ0JhQXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUgKQXdJd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFNSkc3dDJBcnczQUFwNEw4bHE3Q2lVRnBwRWdLcm81SnZEWAp4N3IzYUZLcVJMK21sZGZoanhySmd5emh0d1ZHY2MxUjBoT3RlWXlnN0lrTDBTTUZVMHF4c2lNY3ZXZWIxZ00wCjhMNDdRY1RBSXZRMVRDNHM3Q2hrRldMKzA0TXdxYjNrRWJaY01yMGIxbGFLVDlNbUs2VG1mMXlrcjlnQWRJaTcKK0FIdE5NY0ZZSEFnUzgvVStpSEJ4TjVXRll3ZUZZOHRJdVR1dkd1dHVRVnJjV0R0bTh0akVIc1dsbWcwY3ltcAphRzYzUEIvL1IvS2hVbncxcUlNL3BaK2dQNDVIcTF6THk5b3FDUllFekh6TUVpRWRielFNKzVCdmV5OE41T0x1CmMwb1BpcFZMMGFVRU1wUUwwcGYxa0pkVG5jOVFKaGxUdjNDS25uRndjSVFNUTg5dFk0Yz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
    client-key-data: LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBbEh0UTc2Y2NGN3pnQ1RiNGZMRkZqQkJuWUcxZE9FTlhFaEtYQ2FML2JLVEYyekhLCmFpc2kvbFFkWUJCb1Y1dG5IQnR3N0FUa0M4RUVucmFEaHhYTWhqVGdZR0VEV1dVR2lyYjJXNy9TY1hDTlErWXUKN0NUbnd3ZTdjaXozU3F1TWRuN3BTbzVWblAzUVdENzhGTEdWbzUwOXhXL2EwWHBZZlRzcXJlZDlGaTZja092UgpqQk5LYUF0MmMwTGpZZ1pRNHFxY2xES1pOSk5Eb0R4d1VuY2k0bFVqMitxdWI5eW0yZm53WC9ZRkVUc3JnR3NrCjlnU2FnUjBMWCtibWNZZklwN2VOWUFyVDhjaSs0M0U1VjNIMWFMQk14MWxCcmlGNVQ1bFk2TER5L0pOc2lSOHIKYTR5ejBoVktuWUVrSmZTN1FUQlhXdVE4azl1eTlmQkhyYUYzUXdJREFRQUJBb0lCQUVNRTZrSlJ6bGRVbEZiMApiZkp5WFc3Y0ZKMHNuKy8rVFRYR0dGQnNOeGhGdzF5dHU2eHlMZ2hYMVM2QUdXaTVweS9EbnhPWkhZbkVwSjR5CnlXbFd5SXNuSU1PLzVqQWFibnA4SFBUS3YyVWVwVlNwZURKMGNmdlE2S1dmY0R0TzlVYWpBQS83OE42OG5hYkgKUHlia0JTUGxuSFVhaU0wV2lReDFnVTBmZUpGaTVwdk11WEdNMWZUZ21ISVdaN3V1RTUwSmJNazNtTXpmcXVmaAp2OHFNNXA2UnFBMmhRUkZYZGZrZ1E1VWMvcUM3TXNZYW52RTR1aTdYaUVmazdNZHVWTTlQQTc4N25QZFhZb2ZYCkQzajZWUU9uZ1FPUGtQam5PRE9nL1lXNHVXMGRVQTBmckw0VjZFU3lNQ2NLVk0vTGEwSlVlVXJlYkpnL2JNQTcKWkNLc2FzRUNnWUVBeE1nNXBnQjNxVUV4SkNhS1dBbElsMDRmejhSeEUxZlZaNUZDYVljZGFORDU0ZGp5b0dYawpId3VXR1lZMVp1eWpjTTJWYkxsZE1ibnJLWjRLUXExNW5qNHFsejhselZmbnJ6aHBqWHBBRml1THg5SldCTDZECkVZNHpkaWNram4yQmlscGZFa3RWV0d3ZWpoRjBrYldXK2daTE9oOE5jWE5hRit5MjUrTEN2T0VDZ1lFQXdTb2EKMVBtWGZ6OUF2YjZQUDMzblpxblFXdnhrR2NJdnZmOXBKanVDK3QzTkRpVDhhUmZrRDRINHFOTURzdDlENzFibwpEcnA0dTlHa2w1OGw2TFgzSUVnR21JWEJtamRiVFkxbXlYaEEvYkZ1OEpKUXFaNitXdytoWFdONzFmYUk1UXNiCktLbUc0Si9oNkR0RVB1eStFU1VvYmdzeU90SXJFbjR6cG94MXRLTUNnWUJMNXl1TlkzckVsM2ZjQ04ydURZNnAKaGlIeEkwVzJmMWU2aGlaR3pDNUU0dTZ2OWQzSWp1VEtNTTdwODRHZnZNRmlYbm8zb054WXRPMEhkWVZocU1aVAppb2tsSTk5eDhHbFdoZno0N0dIUjYyUVVaSVozZUFEWWdiQko3OWxDK1JoQmhKQk5YeStCVnRzR1U2ZFNHT2d1CmNzVUxtelMxUVJoTVNDdFpFSGVySVFLQmdRQ3cvZldNQkE3T3A1U1l4OHpWN25WaldtSHhuS1hUL0Z4bWlXczkKZnZZckM2VGlPdjJWQmpFUURKVmRpOHd0eittZG1sSVRmTVUzdzRZKzc3SjZvcEVINFRjNTlnVkpXME9yc2M3bQo5K3NGQ2RtUFVXSGJxZnJkMFZxWUNabmttWHNoODZVMUF2RDFUVXBmMGo1Y01leU9KVEFBZFAzWGE4L1BxQmVICm1kZ1laUUtCZ1FDQjhIWVRxYjNKVHNEYnRzZ0J5TitpQ256V004dm1GcVNQdWJWdzh6NVpIdkxneGg4dnJIZFYKem02bEIwQWtDTENLMjI1dWIzRER3NkhzQkpwa3BseFpPdGpBOVJscHZ3WFFCWnVndC85clpKOXgwOGJkeWdBbwpkaW9OaEY4SHZKV21BYXI4c0dGaWtvNjV4RlNxVGdlY1RqanJFVkpWa2VqNkJLWDVnWmUzbFE9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=

`;
export const provider = new k8s.Provider('myProvider',{
  kubeconfig:kubeConfigContent,
  cluster:"kubernetes",
  context:"kubernetes-admin@kubernetes",

});