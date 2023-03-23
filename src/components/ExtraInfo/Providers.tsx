import styles from "@/components/ExtraInfo/ExtraInfo.module.css";
import {ProvidersDto} from "@/models/dto/ProvidersDto";
import {CompanyLogo} from "@/components/ExtraInfo/CompanyLogo";

type props = {
    providers:ProvidersDto
}

export function Providers({providers}:props){
    return (
        <div className={styles.info}>
            <p>Available on</p>
            <div className={styles.logos}>
                {providers.results.US.flatrate && providers.results.US.flatrate.length > 0
                    ? providers.results.US.flatrate?.map(st => <CompanyLogo
                        key={`${st.provider_name} logo`}
                        name={st.provider_name}
                        logo_path={st.logo_path}
                    />)
                    : <div><small>Currently it&#39;s not available for streaming.</small></div>}
                <small>You can visit <a href={"https://www.justwatch.com/"}>JustWatch</a> for more information.</small>
            </div>
        </div>
    )
}