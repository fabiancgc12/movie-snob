import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import {ProvidersDto} from "@/utils/models/dto/ProvidersDto";
import {CompanyLogo} from "@/components/ExtraInfo/CompanyLogo";

type props = {
    providers:ProvidersDto
}

export function Providers({providers}:props){
    return (
        <div className={styles.info}>
            <p>Available on</p>
            <div className={styles.logos}>
                {providers.results.US.flatrate?.map(st => <CompanyLogo
                    key={`${st.provider_name} logo`}
                    name={st.provider_name}
                    logo_path={st.logo_path}
                />)}
                <small>You can visit <a href={"https://www.justwatch.com/"}>JustWatch</a> for more information</small>
            </div>
        </div>
    )
}