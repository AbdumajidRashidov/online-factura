import React from "react";

import { Button, PageHeading, Typography } from "components";

const IncomeSingle = () => {
	return (
		<>
			<PageHeading
				links={[
					{ link: "/", label: "Главная" },
					{ link: "/", label: "Кассa" },
					{ label: "Счет-фактура №03-60378 от 31.03.2021" },
				]}
			/>

			<div className="row">
				<div className="col-8">
					<div className="account-card">
						<div className="account-card__header">
							<div>
								<Typography Type="h3" text="Счет-фактура" />
								<Typography Type="p" text="№03-60378 от 31.03.2021" />
								<Typography Type="p" text="566800736" />
							</div>
							<Typography Type="span" text="Статус документа в ГНК" />
						</div>
						<div className="account-card__main">
							<Typography Type="p" text="Отправитель:" />
							<Typography
								Type="p"
								text='ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "VENKON GROUP"'
							/>
						</div>
						<div className="account-card__footer">
							<div>
								<Typography Type="p" text="Отправитель:" />
								<Typography
									Type="p"
									text='ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "VENKON GROUP"'
								/>
							</div>
							<div className="buttons">
								<Button className="btn btn-sm" design="primary" text={"Скачать"} />
								<Button className="btn btn-sm" design="primary" text={"Печать"} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default IncomeSingle;
